import { useState } from "react";
import { csrfFetch } from "../../../../store/csrf";
import { useModal } from "../../../../context/Modal";
import { FaStar } from "react-icons/fa";
import "./PostReviewModal.css";

function PostReviewModal({ spotId, reloadReviews, getSpotDetails }) {
  const [reviewDescription, setReviewDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const reviewCreationErrors = ({ reviewDescription, stars }) => {
    const newReviewErrors = {};

    if (reviewDescription.length < 10) {
      newReviewErrors.reviewDescription =
        "Review must be 10 characters or longer";
    }
    if (stars === 0) {
      newReviewErrors.stars = "Please select a rating";
    }

    return newReviewErrors;
  };

  const MakeNewReview = async ({ reviewDescription, stars }) => {
    try {
      const res = await csrfFetch(`/api/reviews/${spotId}`, {
        method: "POST",
        body: JSON.stringify({
          review: reviewDescription,
          stars,
        }),
      });

      if (res.status >= 500) {
        setErrors({ serverError: "Server Error" });
      }

      reloadReviews();
      getSpotDetails();
      closeModal();
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const reviewCreationClientSideErrors = reviewCreationErrors({
      reviewDescription,
      stars,
    });

    if (Object.keys(reviewCreationClientSideErrors).length > 0) {
      setErrors(reviewCreationClientSideErrors);
      return;
    }

    MakeNewReview({ reviewDescription, stars });
    reloadReviews();
  };

  return (
    <div className="post-review-container">
      <form className="post-review-form" onSubmit={onSubmit}>
        <div className="title-description-container">
          <h1 className="post-review-title">How was your stay?</h1>
          {errors.serverError && (
            <p className="post-review-errors">{errors.serverError}</p>
          )}
          <label
            htmlFor="review-description"
            className="post-review-description-input container"
          >
            <textarea
              id="review-description"
              className="post-review-description-input"
              type="text"
              placeholder="Leave your review here..."
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
              required
            />
          </label>
          {errors.reviewDescription && (
            <p className="post-review-errors">{errors.reviewDescription}</p>
          )}
        </div>
        <div className="stars-and-submit-container">
          <div className="star-input-container">
            {[...Array(5)].map((star, idx) => {
              const currentRating = idx + 1;
              return (
                <span
                  key={currentRating}
                  onClick={() => setStars(currentRating)}
                  style={{ cursor: "pointer" }}
                >
                  <FaStar color={currentRating <= stars ? "black" : "white"} />
                </span>
              );
            })}
            <p>Stars</p>
          </div>
          {errors.stars && <p className="post-review-errors">{errors.stars}</p>}
          <button className="submit-review-button">Submit Your Review</button>
        </div>
      </form>
    </div>
  );
}

export default PostReviewModal;
