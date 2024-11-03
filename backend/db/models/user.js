"use strict";
const { Model, Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserSpot, {
        foreignKey: "userId",
      });
      User.hasMany(models.Spot, {
        as: 'OwnedSpots',
        foreignKey: "ownerId",
      });
      User.hasMany(models.Review, {
        foreignKey: "userId",
      });
      User.hasMany(models.Booking, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50],
          isAlpha: true,
          isFirstLetterCap(value) {
            if (value[0] !== value[0].toUpperCase()) {
              throw new Error("Names must be capitalized");
            }
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50],
          isAlpha: true,
          isFirstLetterCap(value) {
            if (value[0] !== value[0].toUpperCase()) {
              throw new Error("Names must be capitalized");
            }
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Invalid username punk (not a rickroll)");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { len: [3, 256], isEmail: true },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: { len: [60, 60] },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "updatedAt", "email", "createdAt"],
        },
      },
    }
  );
  return User;
};
