"use strict";

/** @type {import('sequelize-cli').Migration} */
const { UserSpot } = require("../models");
module.exports = {
  async up(queryInterface, Sequelize) {
    await UserSpot.bulkCreate(
      [
        { userId: 1, spotId: 1 },
        { userId: 1, spotId: 2 },
        { userId: 1, spotId: 3 },
        { userId: 2, spotId: 2 },
        { userId: 2, spotId: 4 },
        { userId: 3, spotId: 1 },
        { userId: 3, spotId: 3 },
        { userId: 3, spotId: 5 },
        { userId: 4, spotId: 1 },
        { userId: 4, spotId: 4 },
        { userId: 4, spotId: 5 },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserSpots", {});
  },
};
