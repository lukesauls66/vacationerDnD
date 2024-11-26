"use strict";

/** @type {import('sequelize-cli').Migration} */
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://i.ibb.co/T06ssMn/zeff-house-1.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.ibb.co/dbW1PJZ/zeff-house-2.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.ibb.co/m5YHchX/zeff-house-3.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.ibb.co/R08YyfP/zeff-house-4.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://i.ibb.co/bJZcVQM/zeff-house-5.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/NNfPMJQ/arlong-house-1.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/6tr9k3m/arlong-house-2.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/wCv75vh/arlong-house-3.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/kq5zkqt/arlong-house-4.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.ibb.co/rxTxFcN/arlong-house-5.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/PhdL18p/dadan-house-1.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/ZLGDfnr/dadan-house-2.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/vxQRhZW/dadan-house-3.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/5BX6gSC/dadan-house-4.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ibb.co/CtYLQRR/dadan-house-5.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/xf44LVk/franky-house-1.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/3yJmcqR/franky-house-2.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/KbrRGPJ/franky-house-3.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/gz9m5mP/franky-house-4.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ibb.co/vh8wXWT/franky-house-5.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/bKbjY9W/mihawk-house-1.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/BqM91Db/mihawk-house-2.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/7k1hnM3/mihawk-house-3.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/W0Y9T98/mihawk-house-4.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ibb.co/tJwHS3S/mihawk-house-5.jpg",
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
