"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Review } = require("../models");
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
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", {});
  },
};
