"use strict";
const { Model, DATE } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, {
        as: "Owner",
        foreignKey: "ownerId",
      });
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
      });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [1, 255],
          firstLetterCap(value) {
            const array = value.split(" ");

            if (isNaN(array[0])) {
              throw new Error("Address must start with a number");
            }

            array.slice(1).forEach((val) => {
              if (val[0] !== val[0].toUpperCase()) {
                throw new Error("Address must be capitalized.");
              }
            });
          },
        },
      },
      city: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          len: [1, 150],
          firstLetterCap(value) {
            const array = value.split(" ");
            array.forEach((val) => {
              if (val[0] !== val[0].toUpperCase()) {
                throw new Error("City must be capitalized.");
              }
            });
          },
        },
      },
      state: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          len: [1, 150],
          firstLetterCap(value) {
            const array = value.split(" ");
            array.forEach((val) => {
              if (val[0] !== val[0].toUpperCase()) {
                throw new Error("State must be capitalized.");
              }
            });
          },
        },
      },
      country: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          len: [1, 150],
        },
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING(400),
        allowNull: false,
        validate: {
          len: [30, 400],
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      numReviews: {
        type: DataTypes.INTEGER,
      },
      avgRating: {
        type: DataTypes.FLOAT,
      },
      previewImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      additionImageUrls: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
