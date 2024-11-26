"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Booking } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 5,
          startDate: new Date("2024-12-01"),
          endDate: new Date("2024-12-05"),
        },
        {
          spotId: 2,
          userId: 8,
          startDate: new Date("2024-12-10"),
          endDate: new Date("2024-12-15"),
        },
        {
          spotId: 3,
          userId: 6,
          startDate: new Date("2023-01-10"),
          endDate: new Date("2023-01-15"),
        },
        {
          spotId: 4,
          userId: 2,
          startDate: new Date("2024-12-20"),
          endDate: new Date("2024-12-25"),
        },
        {
          spotId: 5,
          userId: 1,
          startDate: new Date("2024-12-26"),
          endDate: new Date("2024-12-30"),
        },
        // {
        //   spotId: 6,
        //   userId: 7,
        //   startDate: new Date("2024-11-15"),
        //   endDate: new Date("2024-11-20"),
        // },
        // {
        //   spotId: 6,
        //   userId: 6,
        //   startDate: new Date("2024-10-05"),
        //   endDate: new Date("2024-10-10"),
        // },
        // {
        //   spotId: 7,
        //   userId: 2,
        //   startDate: new Date("2024-09-12"),
        //   endDate: new Date("2024-09-17"),
        // },
        // {
        //   spotId: 8,
        //   userId: 3,
        //   startDate: new Date("2024-08-01"),
        //   endDate: new Date("2024-08-05"),
        // },
        // {
        //   spotId: 9,
        //   userId: 4,
        //   startDate: new Date("2024-07-15"),
        //   endDate: new Date("2024-07-20"),
        // },
        // {
        //   spotId: 10,
        //   userId: 5,
        //   startDate: new Date("2024-12-01"),
        //   endDate: new Date("2024-12-07"),
        // },
        // {
        //   spotId: 11,
        //   userId: 6,
        //   startDate: new Date("2024-11-20"),
        //   endDate: new Date("2024-11-25"),
        // },
        // {
        //   spotId: 12,
        //   userId: 7,
        //   startDate: new Date("2024-06-10"),
        //   endDate: new Date("2024-06-15"),
        // },
        // {
        //   spotId: 13,
        //   userId: 8,
        //   startDate: new Date("2024-05-22"),
        //   endDate: new Date("2024-05-27"),
        // },
        // {
        //   spotId: 14,
        //   userId: 9,
        //   startDate: new Date("2024-04-15"),
        //   endDate: new Date("2024-04-20"),
        // },
        // {
        //   spotId: 15,
        //   userId: 10,
        //   startDate: new Date("2024-03-01"),
        //   endDate: new Date("2024-03-05"),
        // },
        // {
        //   spotId: 16,
        //   userId: 11,
        //   startDate: new Date("2024-02-10"),
        //   endDate: new Date("2024-02-15"),
        // },
        // {
        //   spotId: 17,
        //   userId: 12,
        //   startDate: new Date("2023-12-15"),
        //   endDate: new Date("2023-12-20"),
        // },
        // {
        //   spotId: 18,
        //   userId: 13,
        //   startDate: new Date("2023-11-05"),
        //   endDate: new Date("2023-11-10"),
        // },
        // {
        //   spotId: 19,
        //   userId: 14,
        //   startDate: new Date("2023-10-10"),
        //   endDate: new Date("2023-10-15"),
        // },
        // {
        //   spotId: 20,
        //   userId: 15,
        //   startDate: new Date("2023-09-20"),
        //   endDate: new Date("2023-09-25"),
        // },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, {});
  },
};
