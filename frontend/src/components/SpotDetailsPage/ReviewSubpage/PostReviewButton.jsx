import { useState } from "react";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import PostReviewModal from "./PostReviewModal/PostReviewModal";

function PostReviewButton({ spotId, reloadReviews, getSpotDetails }) {
  const [isPostReviewModal, setIsPostReviewModal] = useState(false);

  const openAndCloseModal = () => {
    setIsPostReviewModal(!isPostReviewModal);
  };

  return (
    <div className="post-review-button-container" onClick={openAndCloseModal}>
      <OpenModalButton
        className=""
        buttonText="Post Your Review"
        modalComponent={
          <PostReviewModal
            spotId={spotId}
            reloadReviews={reloadReviews}
            getSpotDetails={getSpotDetails}
          />
        }
      />
    </div>
  );
}

export default PostReviewButton;
