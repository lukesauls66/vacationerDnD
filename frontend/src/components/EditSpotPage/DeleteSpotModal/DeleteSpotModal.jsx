import { csrfFetch } from "../../../store/csrf";
import { useModal } from "../../../context/Modal";
import "./DeleteSpotModal.css";

function DeleteSpotModal({ spotId, refreshSpots }) {
  const { closeModal } = useModal();

  const deleteSpot = async (spotId) => {
    try {
      const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Spot deletion data:", data);
        refreshSpots();
        closeModal();
      } else {
        const errorData = await res.json();
        console.error("Failed to delete spot:", errorData);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const yesButtonClick = (e) => {
    e.preventDefault();
    deleteSpot(spotId);
  };

  const noButtonClick = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="delete-spot-modal-container">
      <h1 className="delete-spot-modal-h1">Confirm Delete</h1>
      <p className="delete-spot-modal-p">
        Are you sure you want to remove this spot from the listings?
      </p>
      <div className="delete-spot-modal-buttons-container">
        <button className="yes-delete-spot-button" onClick={yesButtonClick}>
          Yes (Delete Spot)
        </button>
        <button className="no-delete-spot-button" onClick={noButtonClick}>
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
}

export default DeleteSpotModal;
