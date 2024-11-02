"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Review.belongsTo(models.Spot, {
        foreignKey: "spotId",
      });
      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
      });
    }
  }
  Review.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [1, 255],
        },
      },
      stars: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
