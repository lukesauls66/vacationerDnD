const { Review, Spot } = require("../db/models/");

async function addReview(userId, spotId, review, stars) {
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    throw new Error("Spot couldn't be found");
  }

  const allReviews = await Review.findAll({ where: { userId, spotId } });
  if (allReviews.length !== 0) {
    throw new Error("User already has a review for this spot");
  }

  const newReview = await Review.create({
    userId,
    spotId,
    review,
    stars,
  });

  const reviews = await Review.findAll({ where: { spotId } });
  const numReviews = reviews.length;
  const avgRating =
    reviews.reduce((sum, review) => sum + review.stars, 0) / numReviews;

  await Spot.update({ numReviews, avgRating }, { where: { id: spotId } });

  return newReview;
}

module.exports = {
  addReview,
};
