"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Booking } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 2,
          startDate: new Date("2025-12-01"),
          endDate: new Date("2025-12-05"),
        },
        {
          spotId: 2,
          userId: 3,
          startDate: new Date("2025-12-10"),
          endDate: new Date("2025-12-15"),
        },
        {
          spotId: 3,
          userId: 4,
          startDate: new Date("2025-12-20"),
          endDate: new Date("2025-12-25"),
        },
        {
          spotId: 4,
          userId: 5,
          startDate: new Date("2025-12-26"),
          endDate: new Date("2025-12-30"),
        },
        {
          spotId: 5,
          userId: 1,
          startDate: new Date("2025-11-15"),
          endDate: new Date("2025-11-20"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, {});
  },
};
