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
          firstName: "Sora",
          lastName: "Smith",
          email: "sora@example.com",
          username: "keyblade_master",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Maleficent",
          lastName: "Nightshade",
          email: "maleficent@example.com",
          username: "blackdragon",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Riku",
          lastName: "Mitsunari",
          email: "riku@example.com",
          username: "emoboi",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Scrooge",
          lastName: "McFortune",
          email: "scrooge@example.com",
          username: "mr_wealthy",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          firstName: "Merlin",
          lastName: "Ambrosius",
          email: "merlin@example.com",
          username: "magicman",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          firstName: "King",
          lastName: "Triton",
          email: "triton@example.com",
          username: "kingofthesea",
          hashedPassword: bcrypt.hashSync("password6"),
        },
        {
          firstName: "Mickey",
          lastName: "Mouse",
          email: "mickey@example.com",
          username: "ogcharacter",
          hashedPassword: bcrypt.hashSync("password7"),
        },
        {
          firstName: "Winnie",
          lastName: "Pooh",
          email: "winnie@example.com",
          username: "honeypot",
          hashedPassword: bcrypt.hashSync("password8"),
        },
        {
          firstName: "Ansem",
          lastName: "Wise",
          email: "ansem@example.com",
          username: "door2darkness",
          hashedPassword: bcrypt.hashSync("password9"),
        },
        {
          firstName: "Demo",
          lastName: "Users",
          email: "demo@example.com",
          username: "demouser",
          hashedPassword: bcrypt.hashSync("password10"),
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
