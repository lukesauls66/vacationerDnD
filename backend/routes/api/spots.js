const router = require("express").Router();
const { handleValidationErrors } = require('../../utils/validation')

const {
  Spot,
  User,
  SpotImage,
  Review,
  ReviewImage,
} = require("../../db/models");

// ### Get all Spots

router.get("/", async (req, res) => {
  try {
    const spots = await Spot.findAll();
    res.status(200).json({ Spots: spots });
  } catch (err) {
    res.status(500).json({
      message: "Unexpected error: skill issue",
    });
  }
});

// ### Get all Spots owned by the Current User

// - Require Authentication: true
// - Request

//   - Method: GET
//   - Route path: /user/:userId/spots
//   - Body: none
//! -> goes in user route?

// ### Get details of a Spot from an id

router.get("/:spotId", async (req, res) => {
  try {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: SpotImage,
          as: "SpotImages",
          attributes: ["id", "url", "preview"],
        },
        {
          model: User,
          as: "Owner",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    res.status(200).json(spot);
  } catch (err) {
    console.error("Error fetching spot details: ", err);
    res.status(500).json({ message: "Error fetching spot details" });
  }
});

router.get("/:spotId/reviews", async (req, res) => {
  try {
    const spotId = req.params.spotId;

    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: ReviewImage,
          as: "ReviewImages",
          attributes: ["id", "url"],
        },
      ],
    });

    if (reviews.length === 0) {
      res.status(404).json({ message: "Spot couldn't be found" });
    }

    res.json({ Reviews: reviews });
  } catch (err) {
    console.error("Error getting spot reviews: ", err);
    res.status(500).json({ message: "Error getting spot reviews" });
  }
});

// Creates and returns a new spot.

// - Require Authentication: true
// - Request

//   - Method: POST
//   - Route path: /spots
//   - Headers:
//     - Content-Type: application/json
//   - Body:

//     ```json
//     {
//       "address": "123 Disney Lane",
//       "city": "San Francisco",
//       "state": "California",
//       "country": "United States of America",
//       "lat": 37.7645358,
//       "lng": -122.4730327,
//       "name": "App Academy",
//       "description": "Place where web developers are created",
//       "price": 123
//     }
//     ```

router.post('/spots', requireAuth,
  [
    check()
  ],
  async (req, res) => {
  try {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
  
    const newSpot = await Spot.create({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
  
    res.status(201).json(newSpot)

  } catch (err) {
    console.error('Bad Request', err);
    res.status(400).json({
      message: 'Bad Request',
    })
  }


})

module.exports = router;
