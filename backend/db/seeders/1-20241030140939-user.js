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
          firstName: "Abigail",
          lastName: "Carpenter",
          email: "abigail@example.com",
          username: "abigail_carpenter",
          hashedPassword: bcrypt.hashSync("amethystlover"),
        },
        {
          firstName: "Sebastian",
          lastName: "Rider",
          email: "sebastian@example.com",
          username: "sebastian_rider",
          hashedPassword: bcrypt.hashSync("froglife"),
        },
        {
          firstName: "Penny",
          lastName: "Teacher",
          email: "penny@example.com",
          username: "penny_teacher",
          hashedPassword: bcrypt.hashSync("booklover"),
        },
        {
          firstName: "Haley",
          lastName: "Photographer",
          email: "haley@example.com",
          username: "haley_photographer",
          hashedPassword: bcrypt.hashSync("fashionqueen"),
        },
        {
          firstName: "Sam",
          lastName: "Musician",
          email: "sam@example.com",
          username: "sam_musician",
          hashedPassword: bcrypt.hashSync("skaterboy"),
        },
        {
          firstName: "Leah",
          lastName: "Sculptor",
          email: "leah@example.com",
          username: "leah_sculptor",
          hashedPassword: bcrypt.hashSync("forestartist"),
        },
        {
          firstName: "Harvey",
          lastName: "Doctor",
          email: "harvey@example.com",
          username: "harvey_doctor",
          hashedPassword: bcrypt.hashSync("healthyhearts"),
        },
        {
          firstName: "Elliott",
          lastName: "Writer",
          email: "elliott@example.com",
          username: "elliott_writer",
          hashedPassword: bcrypt.hashSync("beachpoet"),
        },
        {
          firstName: "Maru",
          lastName: "Engineer",
          email: "maru@example.com",
          username: "maru_engineer",
          hashedPassword: bcrypt.hashSync("stardust"),
        },
        {
          firstName: "Alex",
          lastName: "Athlete",
          email: "alex@example.com",
          username: "alex_athlete",
          hashedPassword: bcrypt.hashSync("gridballstar"),
        },
        {
          firstName: "Emily",
          lastName: "Tailor",
          email: "emily@example.com",
          username: "emily_tailor",
          hashedPassword: bcrypt.hashSync("crystaldreams"),
        },
        {
          firstName: "Shane",
          lastName: "Farmer",
          email: "shane@example.com",
          username: "shane_farmer",
          hashedPassword: bcrypt.hashSync("bluechickens"),
        },
        {
          firstName: "Caroline",
          lastName: "Gardener",
          email: "caroline@example.com",
          username: "caroline_gardener",
          hashedPassword: bcrypt.hashSync("greenhousequeen"),
        },
        {
          firstName: "Pierre",
          lastName: "Merchant",
          email: "pierre@example.com",
          username: "pierre_merchant",
          hashedPassword: bcrypt.hashSync("shopkeeper"),
        },
        {
          firstName: "Clint",
          lastName: "Blacksmith",
          email: "clint@example.com",
          username: "clint_blacksmith",
          hashedPassword: bcrypt.hashSync("ironforge"),
        },
        {
          firstName: "Jas",
          lastName: "Student",
          email: "jas@example.com",
          username: "jas_student",
          hashedPassword: bcrypt.hashSync("ponytails"),
        },
        {
          firstName: "Vincent",
          lastName: "Student",
          email: "vincent@example.com",
          username: "vincent_student",
          hashedPassword: bcrypt.hashSync("toycars"),
        },
        {
          firstName: "Lewis",
          lastName: "Mayor",
          email: "lewis@example.com",
          username: "lewis_mayor",
          hashedPassword: bcrypt.hashSync("truffleoil"),
        },
        {
          firstName: "Marnie",
          lastName: "Rancher",
          email: "marnie@example.com",
          username: "marnie_rancher",
          hashedPassword: bcrypt.hashSync("animalfriend"),
        },
        {
          firstName: "Robin",
          lastName: "Carpenter",
          email: "robin@example.com",
          username: "robin_carpenter",
          hashedPassword: bcrypt.hashSync("workbench"),
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
