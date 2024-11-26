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
        // Spot 1: cozy farmhouse
        {
          userId: 9,
          spotId: 1,
          review: "This farmhouse is adorable! The mountain views were breathtaking, and it felt so peaceful.",
          stars: 5,
        },
        {
          userId: 5,
          spotId: 1,
          review: "A perfect escape from city life. Loved the farmland and quiet surroundings.",
          stars: 5,
        },
        {
          userId: 10,
          spotId: 1,
          review: "Great place, but the wifi was spotty, making it hard to stay connected.",
          stars: 4,
        },
        {
          userId: 15,
          spotId: 1,
          review: "Charming and peaceful, but the lack of modern amenities was a downside.",
          stars: 3,
        },

        // Spot 2: Forest Retreat
        {
          userId: 10,
          spotId: 2,
          review: "The cabin is magical! It felt like staying in a fairy tale. Perfect for relaxation.",
          stars: 5,
        },
        {
          userId: 6,
          spotId: 2,
          review: "A lovely retreat, but the cabin was a bit too rustic for my taste.",
          stars: 3,
        },
        {
          userId: 16,
          spotId: 2,
          review: "Incredible forest views and so tranquil. Just what I needed.",
          stars: 4,
        },
        {
          userId: 11,
          spotId: 2,
          review: "Beautiful setting, but the nearest store was too far for convenience.",
          stars: 3,
        },

        // Spot 3: Riverbank Cottage
        {
          userId: 9,
          spotId: 3,
          review: "Waking up to the sound of the river was the best part of my stay!",
          stars: 5,
        },
        {
          userId: 7,
          spotId: 3,
          review: "A charming and peaceful place. Perfect for fishing and relaxing by the river.",
          stars: 5,
        },
        {
          userId: 12,
          spotId: 3,
          review: "The cottage was cozy and well-maintained. Loved the riverside view.",
          stars: 5,
        },
        {
          userId: 17,
          spotId: 3,
          review: "The river was beautiful, but the cottage itself felt a little cramped.",
          stars: 3,
        },

        // Spot 4: Stardrop Hill Retreat
        {
          userId: 8,
          spotId: 4,
          review: "The views from Stardrop Hill are unreal! Stargazing was an unforgettable experience.",
          stars: 5,
        },
        {
          userId: 13,
          spotId: 4,
          review: "Great location for nature lovers, but the trails were tougher than expected.",
          stars: 4,
        },
        {
          userId: 18,
          spotId: 4,
          review: "Absolutely loved it! The night sky was like a dream, but the drive up was tricky.",
          stars: 4,
        },
        {
          userId: 8,
          spotId: 4,
          review: "The retreat was serene, but the steep hill made it hard to reach.",
          stars: 3,
        },

        // Spot 5: Seaside Getaway
        {
          userId: 1,
          spotId: 5,
          review: "The beachfront location was amazing. We spent hours enjoying the private dock.",
          stars: 5,
        },
        {
          userId: 14,
          spotId: 5,
          review: "Incredible ocean views and a well-equipped home. Perfect for a seaside vacation.",
          stars: 5,
        },
        {
          userId: 9,
          spotId: 5,
          review: "Beautiful home, but the salty air seemed to affect the furniture's condition.",
          stars: 4,
        },
        {
          userId: 19,
          spotId: 5,
          review: "An amazing getaway! The dock was perfect for watching sunsets.",
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
