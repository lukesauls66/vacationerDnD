"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Spot } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 2,
          address: "123 Maleficent Ln",
          city: "Hollow Bastion",
          state: "Eldoria",
          country: "Valerith",
          lat: 9.7817,
          lng: -89.6501,
          name: "Massive Dark Castle",
          description:
            "An ancient, mystical fortress shrouded in mystery, where the remnants of forgotten technology and magic intertwine.",
          price: 560.0,
          numReviews: 25,
          avgRating: 4.8,
          previewImage:
            "https://drive.google.com/uc?export=view&id=1qhPaAZFcmMGK4Dt3dftdBXynNphAwlmn",
        },
        {
          ownerId: 4,
          address: "58 Goldleaf Avenue",
          city: "Richmond Falls",
          state: "Glimmerstone",
          country: "Scandovia",
          lat: 39.7392,
          lng: -104.9903,
          name: "Country-side Manor",
          description:
            "A mansion, located in the heart of Richmond Falls, is a grand estate filled with opulent décor, towering marble columns, and an extensive collection of priceless treasures.",
          price: 370.0,
          numReviews: 30,
          avgRating: 4.9,
          previewImage:
            "https://drive.google.com/uc?export=view&id=1PxI2xHObFqjNee6gbAu18LRPREBvv7dJ",
        },
        {
          ownerId: 5,
          address: "783 Wisdom Way",
          city: "Gleaming Isle",
          state: "Radiant Garden",
          country: "Luminara",
          lat: 34.0522,
          lng: -118.2437,
          name: "Cave Dwelling",
          description:
            "A hidden sanctuary nestled in the heart of Traverse Town, where magic and mystery converge.",
          price: 80.0,
          numReviews: 15,
          avgRating: 4.5,
          previewImage:
            "https://drive.google.com/uc?export=view&id=1yScyURSUdUoMzeme2DaULIU9bzP1vclw",
        },
        {
          ownerId: 5,
          address: "37 Enchanted Lane",
          city: "Traverse Town",
          state: "Radiant Garden",
          country: "Luminara",
          lat: 25.7617,
          lng: -80.1918,
          name: "In-town House",
          description:
            "A peaceful home tucked away in the heart of Radiant Garden, a haven where magic and knowledge come together.",
          price: 180.0,
          numReviews: 20,
          avgRating: 4.7,
          previewImage:
            "https://drive.google.com/uc?export=view&id=125ExNygoI-LZVa8KFps72H5lQBIAcDPH",
        },
        {
          ownerId: 6,
          address: "1 Seabreeze Lane",
          city: "Triton's Reef",
          state: "Atlantica",
          country: "Oceania",
          lat: 30.2672,
          lng: -97.7431,
          name: "Underwater Castle",
          description:
            "A majestic underwater palace surrounded by shimmering coral reefs and crystal-clear waters, serving as the heart of Atlantica.",
          price: 220.0,
          numReviews: 10,
          avgRating: 4.6,
          previewImage:
            "https://drive.google.com/uc?export=view&id=1sx82ydaBlyAyjf8WTEpU-ULhmci3gp-J",
        },
        {
          ownerId: 7,
          address: "10 Dreamer Way",
          city: "Fantasyland",
          state: "Enchanted Kingdom",
          country: "Luminara",
          lat: 30.2672,
          lng: -97.7431,
          name: "Luxurious Castle",
          description:
            "A charming and whimsical castle nestled in the heart of Fantasyland, where dreams come alive and magic fills the air.",
          price: 430.0,
          numReviews: 32,
          avgRating: 4.9,
          previewImage:
            "https://drive.google.com/uc?export=view&id=1gtCjo3DFKAPGHbHQO-3u9TsrWDMQlTSl",
        },
        {
          ownerId: 8,
          address: "2 Sweetwood Lane",
          city: "100 Acre Wood",
          state: "Dreamland",
          country: "Storybrook",
          lat: 30.2672,
          lng: -97.7431,
          name: "Woodland House",
          description:
            "A cozy, charming home tucked beneath the trees of the 100 Acre Wood, where honey flows as freely as laughter.",
          price: 50.0,
          numReviews: 8,
          avgRating: 4.4,
          previewImage:
            "https://drive.google.com/uc?export=view&id=1SKtjKcs2HrsprgwKCcwpCfwtzYpM_6po",
        },
        {
          ownerId: 9,
          address: "8 Twilight Avenue",
          city: "Twilight Town",
          state: "Eclipsia",
          country: "Duskoria",
          lat: 30.2672,
          lng: -97.7431,
          name: "Wooded Manor",
          description:
            "A mysterious, grand estate that stands at the edge of the quiet town, shrouded in twilight and forgotten memories.",
          price: 260.0,
          numReviews: 27,
          avgRating: 4.7,
          previewImage:
            "https://drive.google.com/uc?export=view&id=1bCXvQFvfw5NbeaTqbtp7yfzAGV9awoJO",
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
          "Cozy Cottage",
          "Mountain Retreat",
          "Sunny Villa",
          "Tropical Escape",
          "Modern Loft",
        ],
      },
    });
  },
};
