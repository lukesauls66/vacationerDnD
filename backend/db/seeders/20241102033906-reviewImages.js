"use strict";

/** @type {import('sequelize-cli').Migration} */
const { ReviewImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: "https://example.com/images/review1.jpg",
          preview: true,
        },
        {
          reviewId: 2,
          url: "https://example.com/images/review2.jpg",
          preview: false,
        },
        {
          reviewId: 3,
          url: "https://example.com/images/review3.jpg",
          preview: true,
        },
        {
          reviewId: 4,
          url: "https://example.com/images/review4.jpg",
          preview: false,
        },
        {
          reviewId: 5,
          url: "https://example.com/images/review5.jpg",
          preview: true,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    await queryInterface.bulkDelete(options, {});
  },
};
