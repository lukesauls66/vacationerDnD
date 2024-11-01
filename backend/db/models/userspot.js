"use strict";
const { Model } = require("sequelize");
const { User } = require("./user");
const { Spot } = require("./spot");
module.exports = (sequelize, DataTypes) => {
  class UserSpot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserSpot.belongsTo(models.User, {
        foreignKey: "userId",
      });
      UserSpot.belongsTo(models.Spot, {
        foreignKey: "spotId",
      });
    }
  }
  UserSpot.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      spotId: {
        type: DataTypes.INTEGER,
        references: {
          model: Spot,
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "UserSpot",
    }
  );
  return UserSpot;
};
