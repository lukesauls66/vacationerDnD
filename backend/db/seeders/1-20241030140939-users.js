"use strict";

/** @type {import('sequelize-cli').Migration} */
const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Users";
    await User.bulkCreate(
      [
        {
          firstName: "Zeff",
          lastName: "Redleg",
          email: "zeff@example.com",
          username: "redleg_cook",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Arlong",
          lastName: "Fish",
          email: "arlong@example.com",
          username: "fishman",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Curly",
          lastName: "Dadan",
          email: "dadan@example.com",
          username: "mother_dearest",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Cutty",
          lastName: "Franky",
          email: "franky@example.com",
          username: "mr_robot",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Dracule",
          lastName: "Mihawk",
          email: "mihawk@example.com",
          username: "strongest_swordsman",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          firstName: "Demo",
          lastName: "Users",
          email: "demo@example.com",
          username: "demouser",
          hashedPassword: bcrypt.hashSync("password6"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "redleg_cook",
            "fishman",
            "mother_dearest",
            "mr_robot",
            "strongest_swordsman",
            "demouser",
          ],
        },
      },
      {}
    );
  },
};
