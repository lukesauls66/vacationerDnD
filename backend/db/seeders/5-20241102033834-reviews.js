"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Review } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          userId: 1,
          spotId: 1,
          review: "Amazing place! Had a wonderful stay.",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 2,
          review: "Decent spot, but could use some improvements.",
          stars: 3,
        },
        {
          userId: 3,
          spotId: 3,
          review: "Loved the location and the amenities!",
          stars: 4,
        },
        {
          userId: 4,
          spotId: 4,
          review: "Not what I expected. Disappointing experience.",
          stars: 2,
        },
        {
          userId: 1,
          spotId: 5,
          review: "Great value for money. Would recommend!",
          stars: 4,
        },
        {
          userId: 5,
          spotId: 6,
          review: "Super clean and cozy. Felt like home.",
          stars: 5,
        },
        {
          userId: 6,
          spotId: 7,
          review: "Good location, but the place was noisy.",
          stars: 3,
        },
        {
          userId: 7,
          spotId: 8,
          review: "An absolute paradise. Will book again!",
          stars: 5,
        },
        {
          userId: 8,
          spotId: 9,
          review: "The views were stunning. Loved every moment.",
          stars: 4,
        },
        {
          userId: 9,
          spotId: 10,
          review: "Poor maintenance and unresponsive host.",
          stars: 2,
        },
        {
          userId: 10,
          spotId: 11,
          review: "Charming little getaway. Quiet and peaceful.",
          stars: 5,
        },
        {
          userId: 11,
          spotId: 12,
          review: "The pictures were better than reality. Meh.",
          stars: 3,
        },
        {
          userId: 12,
          spotId: 13,
          review: "Everything was just perfect. Highly recommended!",
          stars: 5,
        },
        {
          userId: 13,
          spotId: 14,
          review: "It was okay, but wouldn't stay again.",
          stars: 3,
        },
        {
          userId: 14,
          spotId: 15,
          review: "Super friendly host and excellent amenities.",
          stars: 5,
        },
        {
          userId: 15,
          spotId: 16,
          review: "Loved the atmosphere, but the bed was uncomfortable.",
          stars: 3,
        },
        {
          userId: 16,
          spotId: 17,
          review: "Such a peaceful retreat. Can't wait to return!",
          stars: 5,
        },
        {
          userId: 17,
          spotId: 18,
          review: "Not worth the price. Felt cheated.",
          stars: 2,
        },
        {
          userId: 18,
          spotId: 19,
          review: "A unique experience. Definitely worth it.",
          stars: 4,
        },
        {
          userId: 19,
          spotId: 20,
          review: "Everything was top-notch. Best stay ever!",
          stars: 5,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    await queryInterface.bulkDelete(options, {});
  },
};
