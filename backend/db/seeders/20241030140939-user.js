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
    await User.bulkCreate(
      [
        {
          firstName: "Alice",
          lastName: "Smith",
          email: "alice@example.com",
          username: "alice_smith",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Bob",
          lastName: "Johnson",
          email: "bob@example.com",
          username: "bob_johnson",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Charlie",
          lastName: "Brown",
          email: "charlie@example.com",
          username: "charlie_brown",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Diana",
          lastName: "Prince",
          email: "diana@example.com",
          username: "diana_prince",
          hashedPassword: bcrypt.hashSync("password3"),
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
            "alice_smith",
            "bob_johnson",
            "charlie_brown",
            "diana_prince",
          ],
        },
      },
      {}
    );
  },
};
