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
          url: "https://i.ibb.co/xLjRh5F/standard-house.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.ibb.co/wQzJRYD/standard-layout.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.ibb.co/qYpVcDY/standard-zoom.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.ibb.co/GsgtdNf/standard-zoom2.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.ibb.co/7vM4q45/standard-zoom3.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/c2wmtG3/forest-house.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/bssG40B/forest-layout.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/JQrCS4N/forest-zoom.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/rmTg24x/forest-zoom2.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/DLS43t5/forest-zoom3.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/ZJkzC4y/river-house.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/YdtZmWF/river-layout.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/Rhyxx0m/river-zoom.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/WHKg1Dc/river-zoom2.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/GVvCfy1/river-zoom3.png",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/DLq05yK/hilltop-house.png",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/ySWDMY2/hilltop-layout.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/Bt5K1Gv/hilltop-zoom.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/h1JXnfJ/hilltop-zoom2.png",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/BcfnVTV/hilltop-zoom3.png",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/7VVzdVS/beach-house.png",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/CQ1GD65/beach-layout.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/RbNVP33/beach-zoom.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/fnwpXqd/beach-zoom2.png",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/Yf3ZFFS/beach-zoom3.png",
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
