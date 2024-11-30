import { csrfFetch } from "../../../../store/csrf";
import { useModal } from "../../../../context/Modal";
import "./DeleteReviewModal.css";

function DeleteReviewModal({ reviewId, refreshSubpage, refreshMainPage }) {
  const { closeModal } = useModal();

  const deleteReview = async (reviewId) => {
    try {
      const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Review deletion data:", data);
        refreshMainPage();
        refreshSubpage();
        closeModal();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const yesButtonClick = (e) => {
    e.preventDefault();
    deleteReview(reviewId);
  };

  const noButtonClick = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="delete-review-modal-container">
      <h1 className="delete-review-modal-h1">Confirm Delete</h1>
      <p className="delete-review-modal-p">
        Are you sure you want to delete this review?
      </p>
      <div className="delete-review-modal-buttons-container">
        <button className="yes-delete-review-button" onClick={yesButtonClick}>
          Yes (Delete Review)
        </button>
        <button className="no-delete-review-button" onClick={noButtonClick}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}

export default DeleteReviewModal;
