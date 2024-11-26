import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { csrfFetch } from "../../../store/csrf";
import "./ReviewSubpage.css";

function ReviewSubpage() {
  const { spotId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
        const data = await res.json();

        const sortedReviews = data.Reviews.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sortedReviews);
      } catch (err) {
        console.error(err.message || "This spot couldn't be found");
      }
    }
    try {
      getReviews();
    } catch (err) {
      console.error("Error:", err);
    }
  }, [spotId]);

  console.log("reviews", reviews);

  return (
    <div className="reviews-subpage">
      {reviews.length ? (
        <>
          {reviews.map((review) => {
            return (
              <div key={review.id} className="review-container">
                <h1 className="review-user-name">{review.User.firstName}</h1>
                <p className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <p className="review-text">{`"${review.review}"`}</p>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
}

export default ReviewSubpage;
