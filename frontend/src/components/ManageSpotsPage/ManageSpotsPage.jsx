import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpotModal from "../EditSpotPage/DeleteSpotModal/DeleteSpotModal";
import { IoStarSharp } from "react-icons/io5";
import "./ManageSpotsPage.css";

function GetUsersSpots() {
  const navigate = useNavigate();
  const [usersSpots, setUsersSpots] = useState([]);
  const [tooltip, setTooltip] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isDeleteSpotModal, setIsDeleteSpotModal] = useState(false);

  const GetUsersSpotsDetails = useCallback(async () => {
    const res = await csrfFetch("/api/session/spots");
    const data = await res.json();
    console.log("users spots data:", data.Spots);
    setUsersSpots(data.Spots);
  }, []);

  useEffect(() => {
    GetUsersSpotsDetails();
  }, [GetUsersSpotsDetails]);

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

  const onCreateSpotClick = (e) => {
    e.preventDefault();
    navigate("/spots/upload");
  };

  const onEditSpotClick = (e, spotId) => {
    e.preventDefault();
    navigate(`/edit/spots/${spotId}`);
  };

  const openAndCloseDeleteSpotModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDeleteSpotModal(!isDeleteSpotModal);
  };

  return (
    <div className="manage-spots-page" onMouseMove={handleMouseMove}>
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
      <div className="manage-spots-header-container">
        <h1>Manage Your Spots</h1>
        <button
          className="manage-spots-create-spot-button"
          onClick={onCreateSpotClick}
        >
          Create a New Spot
        </button>
      </div>
      {usersSpots?.length > 0 ? (
        <div className="user-spots-container">
          {usersSpots.map((spot) => {
            return (
              <div
                key={spot.id}
                className="individual-user-spot-container"
                onMouseEnter={() => handleMouseEnter(spot.name)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleSpotNavigation(spot.id)}
              >
                <div className="-user-spot-img-container">
                  <img
                    className="user-spot-img"
                    src={spot.previewImage}
                    alt={`Image of ${spot.name}`}
                  />
                </div>
                <div className="user-spot-city-state-avg">
                  <p>
                    {spot.city}, {spot.state}
                  </p>
                  <div className="user-spot-star-rating">
                    <IoStarSharp />
                    <p>{spot.avgRating}</p>
                  </div>
                </div>
                <p>${spot.price}/night</p>
                <div className="update-delete-buttons-container">
                  <button
                    type="button"
                    className="open-modal-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditSpotClick(e, spot.id);
                    }}
                  >
                    Update
                  </button>
                  <div onClick={openAndCloseDeleteSpotModal}>
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={
                        <DeleteSpotModal
                          spotId={spot.id}
                          refreshSpots={GetUsersSpotsDetails}
                        />
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default GetUsersSpots;
