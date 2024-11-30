import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { csrfFetch } from "../../../store/csrf";
import PostReviewButton from "./PostReviewButton";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal/DeleteReviewModal";
import "./ReviewSubpage.css";

function ReviewSubpage({ getSpotDetails }) {
  const { spotId } = useParams();
  const { user } = useSelector((state) => state.session);
  const { currSpots } = useSelector((state) => state.spots);
  const [reviews, setReviews] = useState([]);
  const [isDeleteReviewModal, setIsDeleteReviewModal] = useState(false);

  const getReviews = useCallback(async () => {
    try {
      const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
      const data = await res.json();

      const sortedReviews = data.Reviews.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setReviews(sortedReviews);
    } catch (err) {
      console.error(err.message || "This spot couldn't be found");
      setReviews([]);
    }
  }, [spotId]);

  useEffect(() => {
    getReviews();
  }, [spotId, getReviews]);

  const reloadReviews = () => {
    getReviews();
  };

  const openAndCloseDeleteReviewModal = (e) => {
    e.preventDefault();
    setIsDeleteReviewModal(!isDeleteReviewModal);
  };

  const userIsOwner = user && user.id === currSpots?.Owner.id;
  const userHasReviews = reviews.some((review) => review.User.id === user?.id);

  return (
    <div className="reviews-subpage">
      {user && !userIsOwner && !userHasReviews && (
        <PostReviewButton
          spotId={spotId}
          reloadReviews={reloadReviews}
          getSpotDetails={getSpotDetails}
        />
      )}
      {reviews.length ? (
        <>
          {reviews.map((review) => {
            const reviewBelongsToUser = review.User.id === user?.id;

            return (
              <div key={review.id} className="review-container">
                <h1 className="review-user-name">{review.User.firstName}</h1>
                <p className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <p className="review-text">{`"${review.review}"`}</p>
                {reviewBelongsToUser && (
                  <div onClick={openAndCloseDeleteReviewModal}>
                    <OpenModalButton
                      buttonText={"Delete"}
                      modalComponent={
                        <DeleteReviewModal
                          reviewId={review.id}
                          refreshMainPage={getSpotDetails}
                          refreshSubpage={getReviews}
                        />
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
}

export default ReviewSubpage;
