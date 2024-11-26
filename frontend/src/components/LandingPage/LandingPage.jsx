import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as spotsActions from "../../store/slices/spotsSlice";
import "./LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spots, loading, errors } = useSelector((state) => state.spots);
  const [tooltip, setTooltip] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  // console.log("spots in landing page", spots);

  useEffect(() => {
    dispatch(spotsActions.getAll());
  }, [dispatch]);

  const handleMouseMove = (e) => {
    setTooltipPosition({
      top: e.pageY + 30,
      left: e.pageX + -50,
    });
  };

  const handleMouseEnter = (spotName) => {
    setTooltip(spotName);
  };

  const handleMouseLeave = () => {
    setTooltip("");
  };

  const handleSpotNavigation = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (errors) return <div>Error: {errors}</div>;

  return (
    <div className="landing-page" onMouseMove={handleMouseMove}>
      {tooltip && (
        <div
          className="spot-tooltip"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            position: "absolute",
          }}
        >
          <span>{tooltip}</span>
        </div>
      )}
      {spots?.length > 0 ? (
        <div className="spots-container">
          {spots.map((spot) => {
            return (
              <div
                key={spot.id}
                className="individual-spot-container"
                onMouseEnter={() => handleMouseEnter(spot.name)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleSpotNavigation(spot.id)}
              >
                <div className="landing-page-spot-img-container">
                  <img
                    className="spot-img"
                    src={spot.previewImage}
                    alt={`Image of ${spot.name}`}
                  />
                </div>
                <div className="city-state-avg">
                  <p>
                    {spot.city}, {spot.state}
                  </p>
                  <div className="star-rating">
                    <IoStarSharp />
                    <p>{spot.avgRating}</p>
                  </div>
                </div>
                <p>${spot.price}/night</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No spots available</div>
      )}
    </div>
  );
}

export default LandingPage;
