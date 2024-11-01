"use strict";
const { Model, DATE } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.UserSpot, {
        foreignKey: "spotId",
      });
      Spot.belongsToMany(models.User, {
        through: models.UserSpot,
        foreignKey: "spotId",
        otherKey: "userId",
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
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [1, 255],
          isAlphanumeric: true,
          firstLetterCap(value) {
            const array = value.split(" ");
            array.forEach((val) => {
              if (NaN(val) && val[0] !== val[0].toUpperCase()) {
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
          isAlpha: true,
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
          isAlpha: true,
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
          isAlpha: true,
          firstLetterCap(value) {
            const preps = ["of", "in", "for", "with", "to", "on"];
            const array = value.split(" ");
            array.forEach((val) => {
              if (!preps.includes(val) && val[0] !== val[0].toUpperCase()) {
                throw new Error("Country must be capitalized.");
              }
            });
          },
        },
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 150],
          isAlpha: true,
          firstLetterCap(value) {
            const preps = ["of", "in", "for", "with", "to", "on"];
            const array = value.split(" ");
            array.forEach((val) => {
              if (!preps.includes(val) && val[0] !== val[0].toUpperCase()) {
                throw new Error("Location name must be capitalized.");
              }
            });
          },
        },
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [1, 255],
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
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
