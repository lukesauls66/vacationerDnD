"use strict";

/** @type {import('sequelize-cli').Migration} */
const { User } = require("../models");
const bcrypt = require("bcryptjs");
import { Op } from "sequelize";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: "jjonahjameson@spooderman.com",
          username: "jjj63",
          hashedPassword: bcrypt.hashSync(),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ["jjj63"] },
    });
  },
};
