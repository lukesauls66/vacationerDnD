"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Booking } = require("../models");
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          startDate: new Date("2024-12-01"),
          endDate: new Date("2024-12-05"),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date("2024-12-10"),
          endDate: new Date("2024-12-15"),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date("2022-12-10"),
          endDate: new Date("2022-12-15"),
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date("2024-12-20"),
          endDate: new Date("2024-12-25"),
        },
        {
          spotId: 4,
          userId: 4,
          startDate: new Date("2024-12-26"),
          endDate: new Date("2024-12-30"),
        },
        {
          spotId: 5,
          userId: 1,
          startDate: new Date("2024-11-15"),
          endDate: new Date("2024-11-20"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Bookings", {});
  },
};
