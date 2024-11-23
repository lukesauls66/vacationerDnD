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
        {
          reviewId: 6,
          url: "https://example.com/images/review6.jpg",
          preview: true,
        },
        {
          reviewId: 7,
          url: "https://example.com/images/review7.jpg",
          preview: false,
        },
        {
          reviewId: 8,
          url: "https://example.com/images/review8.jpg",
          preview: true,
        },
        {
          reviewId: 9,
          url: "https://example.com/images/review9.jpg",
          preview: false,
        },
        {
          reviewId: 10,
          url: "https://example.com/images/review10.jpg",
          preview: true,
        },
        {
          reviewId: 11,
          url: "https://example.com/images/review11.jpg",
          preview: true,
        },
        {
          reviewId: 12,
          url: "https://example.com/images/review12.jpg",
          preview: false,
        },
        {
          reviewId: 13,
          url: "https://example.com/images/review13.jpg",
          preview: true,
        },
        {
          reviewId: 14,
          url: "https://example.com/images/review14.jpg",
          preview: false,
        },
        {
          reviewId: 15,
          url: "https://example.com/images/review15.jpg",
          preview: true,
        },
        {
          reviewId: 16,
          url: "https://example.com/images/review16.jpg",
          preview: true,
        },
        {
          reviewId: 17,
          url: "https://example.com/images/review17.jpg",
          preview: false,
        },
        {
          reviewId: 18,
          url: "https://example.com/images/review18.jpg",
          preview: true,
        },
        {
          reviewId: 19,
          url: "https://example.com/images/review19.jpg",
          preview: false,
        },
        {
          reviewId: 20,
          url: "https://example.com/images/review20.jpg",
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
