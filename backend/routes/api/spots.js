const router = require("express").Router();

const { Spot, User, SpotImage } = require("../../db/models");

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

    const reviews = await Review.findAll({ where: { spotId }, include: [] });
  } catch (err) {
    console.error("Error getting spot reviews: ", err);
    res.status(500).json({ message: "Error getting spot reviews" });
  }
});

module.exports = router;
