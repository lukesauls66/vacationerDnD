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
            "A stunning hotel and restaurant by the serene waters of East Blue. Offering picturesque views, luxurious accommodations, and a peaceful escape for travelers seeking both relaxation and adventure.",
          price: 360.0,
          numReviews: 0,
          avgRating: 0,
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
          name: "Waterside Manor",
          description:
            "An opulent mansion nestled by the tranquil Richmond Falls, featuring grand décor and world-class amenities. Ideal for those seeking luxury and elegance, with easy access to scenic views and rich history.",
          price: 370.0,
          numReviews: 0,
          avgRating: 0,
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
          name: "Countryside Cottage",
          description:
            "A charming cottage hidden within the enchanting Gleaming Isle. A perfect retreat for nature lovers, combining rustic beauty with comfort. Escape into a peaceful haven surrounded by rolling hills and fresh air.",
          price: 80.0,
          numReviews: 0,
          avgRating: 0,
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
          description:
            "A modern yet peaceful hotel in the heart of Traverse Town, blending industrial design with comfort. Enjoy tranquil rooms and a quiet atmosphere, just a short walk from town's vibrant culture and landmarks.",
          price: 180.0,
          numReviews: 0,
          avgRating: 0,
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
            "A gothic-style castle perched on a cliff overlooking a dramatic sea. A perfect blend of history and mystery, offering breathtaking views, secluded serenity, and a chance to step into another world.",
          price: 220.0,
          numReviews: 0,
          avgRating: 0,
          previewImage: "https://i.ibb.co/bKbjY9W/mihawk-house-1.jpg",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: [
          "Hotel on the Water",
          "Waterside Manor",
          "Countryside Cottage",
          "Industrial Hotel",
          "Deserted Castle",
        ],
      },
    });
  },
};
