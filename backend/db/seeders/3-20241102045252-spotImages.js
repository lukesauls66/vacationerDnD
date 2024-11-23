"use strict";

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://example.com/images/stardrop-lane.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://example.com/images/stardrop-lane-2.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://example.com/images/junimo-grove.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://example.com/images/saloon-studio.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://example.com/images/saloon-studio-2.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://example.com/images/mountain-cabin.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://example.com/images/dockside-haven.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://example.com/images/miners-cavern.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://example.com/images/miners-cavern-2.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://example.com/images/apple-blossom-inn.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://example.com/images/spa-retreat.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://example.com/images/desert-oasis.jpg",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://example.com/images/tropical-escape.jpg",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://example.com/images/tropical-escape-2.jpg",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://example.com/images/quarry-cottage.jpg",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://example.com/images/cliffside-retreat.jpg",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://example.com/images/cliffside-retreat-2.jpg",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://example.com/images/riverbank-cottage.jpg",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://example.com/images/lavender-inn.jpg",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://example.com/images/seaside-getaway.jpg",
          preview: true,
        },
        {
          spotId: 16,
          url: "https://example.com/images/valley-heights.jpg",
          preview: true,
        },
        {
          spotId: 17,
          url: "https://example.com/images/deepwood-cabin.jpg",
          preview: true,
        },
        {
          spotId: 18,
          url: "https://example.com/images/island-peak-resort.jpg",
          preview: true,
        },
        {
          spotId: 19,
          url: "https://example.com/images/hidden-meadow.jpg",
          preview: true,
        },
        {
          spotId: 20,
          url: "https://example.com/images/stardrop-hill.jpg",
          preview: true,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(options, {});
  },
};
