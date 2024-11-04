const router = require("express").Router();
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth } = require("../../utils/auth")
const { check } = require('express-validator');

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


router.post('/', requireAuth,
  [
    check('address')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsey: true })
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude must be within -90 and 90'),
    check('lng')
      .exists({ checkFalsey: true })
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude must be within -180 and 180'),
    check('name')
      .exists({ checkFalsey: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsey: true })
      .isLength({ min: 1 })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsey: true })
      .isFloat({ gt: 0 })
      .withMessage('Price per day must be a positive number'),
    handleValidationErrors,
  ],
  async (req, res) => {
  try {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
  
    const userId = req.user.id

    const newSpot = await Spot.create({
      ownerId: userId,
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
    console.error('Error creating spot:', err);
    res.status(500).json({
      message: 'Error creating spot',
    })
  }
});

module.exports = router;
