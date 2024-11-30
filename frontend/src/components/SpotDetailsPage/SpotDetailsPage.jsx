import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import ReviewSubpage from "./ReviewSubpage/ReviewSubpage";
import * as spotsActions from "../../store/slices/spotsSlice";
import "./SpotDetails.css";

function SpotDetailsPage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const { currSpots, loading, errors } = useSelector((state) => state.spots);
  const { user } = useSelector((state) => state.session);

  const getSpotDetails = useCallback(async () => {
    try {
      dispatch(spotsActions.getSpotById(spotId));
    } catch (err) {
      console.error("Error:", err);
    }
  }, [dispatch, spotId]);

  useEffect(() => {
    getSpotDetails();
  }, [dispatch, spotId, getSpotDetails]);

  if (loading) return <div>Loading...</div>;
  if (errors) return <div>Error: {errors}</div>;

  const reserveClick = () => {
    alert("Feature Coming Soon...");
  };

  const noReviewsAndNotTheOwner =
    currSpots?.numReviews === 0 && user && user.id !== currSpots.Owner.id;

  return (
    <div className="spot-details-page">
      {currSpots && (
        <>
          <div className="inner-spot-details-page">
            <h1 id="spot-name-h1">{currSpots.name}</h1>
            <p className="city-state-country-container">
              {currSpots.city}, {currSpots.state}, {currSpots.country}
            </p>
            <div className="spot-images-container">
              <img
                className="preview-spot-image"
                src={currSpots?.previewImage}
              />
              <div className="inner-spot-images-container">
                <img
                  className="spot-image"
                  src={
                    currSpots?.additionImageUrls
                      ? currSpots?.additionImageUrls[1]
                      : currSpots?.SpotImages[1].url
                  }
                />
                <img
                  className="spot-image"
                  src={
                    currSpots?.additionImageUrls
                      ? currSpots?.additionImageUrls[2]
                      : currSpots?.SpotImages[2].url
                  }
                />
                <img
                  className="spot-image"
                  src={
                    currSpots?.additionImageUrls
                      ? currSpots?.additionImageUrls[3]
                      : currSpots?.SpotImages[3].url
                  }
                />
                <img
                  className="spot-image"
                  src={
                    currSpots?.additionImageUrls
                      ? currSpots?.additionImageUrls[4]
                      : currSpots?.SpotImages[4].url
                  }
                />
              </div>
            </div>
            <div className="spot-about-container">
              <div className="description-container">
                <h2>
                  Hosted by {currSpots.Owner.firstName}{" "}
                  {currSpots.Owner.lastName}
                </h2>
                <p>{currSpots.description}</p>
              </div>
              <div className="reservation-container">
                <div className="inner-reservation-container">
                  <p>${currSpots.price}/night</p>
                  <div className="reviews-nums-container">
                    {currSpots.numReviews ? (
                      <>
                        <div className="avg-rating-container">
                          <IoStarSharp />
                          <p>{currSpots.avgRating}</p>
                        </div>
                        <LuDot />
                        <p>
                          {currSpots.numReviews}{" "}
                          {currSpots.numReviews === 1 ? "review" : "reviews"}
                        </p>
                      </>
                    ) : (
                      <>
                        <IoStarSharp />
                        <p>New</p>
                      </>
                    )}
                  </div>
                </div>
                <button className="reserve-button" onClick={reserveClick}>
                  Reserve
                </button>
              </div>
            </div>
            <div className="reviews-container">
              <div className="reviews-header">
                {currSpots.numReviews ? (
                  <>
                    <div className="inner-reviews-header">
                      <IoStarSharp />
                      <p>{currSpots.avgRating}</p>
                    </div>
                    <LuDot />
                    <p>
                      {currSpots.numReviews}{" "}
                      {currSpots.numReviews === 1 ? "review" : "reviews"}
                    </p>
                  </>
                ) : (
                  <>
                    <IoStarSharp />
                    <p>New</p>
                  </>
                )}
              </div>
              {noReviewsAndNotTheOwner ? (
                <>
                  <p>Be the first to post a review!</p>
                  <ReviewSubpage getSpotDetails={getSpotDetails} />
                </>
              ) : (
                <ReviewSubpage getSpotDetails={getSpotDetails} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SpotDetailsPage;
