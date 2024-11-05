const router = require("express").Router();

const { requireAuth } = require("../../utils/auth");
const { Review, Spot, ReviewImage } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { reviewId } = req.params;
  const { url } = req.body;

  const review = await Review.findOne({ where: { id: reviewId, userId } });

  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  const allReviewImages = await ReviewImage.findAll({ where: { reviewId } });

  if (allReviewImages.length > 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });
  }

  const newReviewImage = await ReviewImage.create({
    reviewId,
    url,
    preview: false,
  });

  res.status(201).json(newReviewImage);
});

router.post(
  "/:spotId",
  requireAuth,
  [
    check("review")
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Review text is required"),
    check("stars")
      .exists({ checkFalsy: true })
      .isInt({ min: 1, max: 5 })
      .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
  ],
  async (req, res) => {
    const userId = req.user.id;
    const { spotId } = req.params;
    const { review, stars } = req.body;

    const spot = await Spot.findOne({ where: { id: spotId } });

    if (!spot) {
      return res.json({ message: "Spot couldn't be found" });
    }

    const allReviews = await Review.findAll({ where: { userId, spotId } });

    if (allReviews.length !== 0) {
      res
        .status(500)
        .json({ message: "User already has a review for this spot" });
    }

    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars,
    });

    res.status(201).json(newReview);
  }
);

module.exports = router;
