"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Spot } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "123 Cooks Ln",
          city: "East Blue",
          state: "Eldoria",
          country: "Valerith",
          lat: 9.7817,
          lng: -89.6501,
          name: "Hotel on the Water",
          description:
            "A beautiful hotel and restaurant on the water for any travels.",
          price: 360.0,
          numReviews: 25,
          avgRating: 4.8,
          previewImage: "https://i.ibb.co/T06ssMn/zeff-house-1.jpg",
        },
        {
          ownerId: 2,
          address: "58 Arlong Avenue",
          city: "Richmond Falls",
          state: "Glimmerstone",
          country: "Scandovia",
          lat: 39.7392,
          lng: -104.9903,
          name: "Water-side Manor",
          description:
            "A mansion, located in the heart of Richmond Falls, is a grand estate filled with opulent décor.",
          price: 370.0,
          numReviews: 30,
          avgRating: 4.9,
          previewImage: "https://i.ibb.co/NNfPMJQ/arlong-house-1.jpg",
        },
        {
          ownerId: 3,
          address: "783 Wisdom Way",
          city: "Gleaming Isle",
          state: "Radiant Garden",
          country: "Luminara",
          lat: 34.0522,
          lng: -118.2437,
          name: "Country-side Cottage",
          description:
            "A hidden sanctuary nestled in the heart of Traverse Town, where magic and mystery converge.",
          price: 80.0,
          numReviews: 15,
          avgRating: 4.5,
          previewImage: "https://i.ibb.co/PhdL18p/dadan-house-1.jpg",
        },
        {
          ownerId: 4,
          address: "37 Enchanted Lane",
          city: "Traverse Town",
          state: "Radiant Garden",
          country: "Luminara",
          lat: 25.7617,
          lng: -80.1918,
          name: "Industrial Hotel",
          description: "A peaceful hotel on the edge of town.",
          price: 180.0,
          numReviews: 20,
          avgRating: 4.7,
          previewImage: "https://i.ibb.co/xf44LVk/franky-house-1.jpg",
        },
        {
          ownerId: 5,
          address: "1 Dracule Lane",
          city: "Kuraigahara",
          state: "Minzoku Island",
          country: "Kuraiga",
          lat: 30.2672,
          lng: -97.7431,
          name: "Deserted Castle",
          description:
            "A gothic-style castle perched atop a secluded cliff overlooking the vast, stormy sea.",
          price: 220.0,
          numReviews: 10,
          avgRating: 4.6,
          previewImage: "https://i.ibb.co/bKbjY9W/mihawk-house-1.jpg",
        },
      ],
      { validate: false }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: [
          "Hotel on the Water",
          "Water-side Manor",
          "Country-side Cottage",
          "Industrial Hotel",
          "Deserted Castle",
        ],
      },
    });
  },
};
