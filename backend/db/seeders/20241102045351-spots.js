"use strict";

/** @type {import('sequelize-cli').Migration} */
const { Spot } = require("../models");
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          address: "123 Main St",
          city: "Springfield",
          state: "Illinois",
          country: "United States",
          lat: 39.7817,
          lng: -89.6501,
          name: "Cozy Cottage",
          description: "A charming cottage in the heart of Springfield.",
          price: 120.0,
          numReviews: 25,
          avgRating: 4.8,
          previewImage: "https://example.com/images/cozy-cottage.jpg",
        },
        {
          address: "456 Elm St",
          city: "Denver",
          state: "Colorado",
          country: "United States",
          lat: 39.7392,
          lng: -104.9903,
          name: "Mountain Retreat",
          description: "A beautiful retreat with stunning mountain views.",
          price: 150.0,
          numReviews: 30,
          avgRating: 4.9,
          previewImage: "https://example.com/images/mountain-retreat.jpg",
        },
        {
          address: "789 Oak Ave",
          city: "Los Angeles",
          state: "California",
          country: "United States",
          lat: 34.0522,
          lng: -118.2437,
          name: "Sunny Villa",
          description: "A sunny villa close to the beach.",
          price: 200.0,
          numReviews: 15,
          avgRating: 4.5,
          previewImage: "https://example.com/images/sunny-villa.jpg",
        },
        {
          address: "321 Pine Blvd",
          city: "Miami",
          state: "Florida",
          country: "United States",
          lat: 25.7617,
          lng: -80.1918,
          name: "Tropical Escape",
          description: "A tropical getaway with a pool.",
          price: 180.0,
          numReviews: 20,
          avgRating: 4.7,
          previewImage: "https://example.com/images/tropical-escape.jpg",
        },
        {
          address: "654 Maple St",
          city: "Austin",
          state: "Texas",
          country: "United States",
          lat: 30.2672,
          lng: -97.7431,
          name: "Modern Loft",
          description: "A stylish loft in downtown Austin.",
          price: 220.0,
          numReviews: 10,
          avgRating: 4.6,
          previewImage: "https://example.com/images/modern-loft.jpg",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Spots", {
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
