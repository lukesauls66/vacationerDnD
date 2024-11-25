import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as spotsActions from "../../store/slices/spotsSlice";
import "./LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const { spots, loading, errors } = useSelector((state) => state.spots);
  const [tooltip, setTooltip] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  // console.log("spots in landing page", spots);

  useEffect(() => {
    dispatch(spotsActions.getAll());
  }, [dispatch]);

  const handleMouseMove = (e) => {
    setTooltipPosition({
      top: e.clientY + 30,
      left: e.clientX + -50,
    });
  };

  const handleMouseEnter = (spotName) => {
    setTooltip(spotName);
  };

  const handleMouseLeave = () => {
    setTooltip("");
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
              >
                {console.log("image url:", spot.previewImage)}
                <img
                  className="spot-img"
                  src={spot.previewImage}
                  alt={`Image of ${spot.name}`}
                />
                <div className="city-state-avg">
                  <p>
                    {spot.city}, {spot.state}
                  </p>
                  <div>
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
