import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as spotsActions from "../../store/slices/spotsSlice";
import "./SpotDetails.css";

function SpotDetailsPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const { spots, loading, errors } = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(spotsActions.getSpotById(spotId));
  }, [dispatch, spotId]);

  if (loading) return <div>Loading...</div>;
  if (errors) return <div>Error: {errors}</div>;

  return (
    <div className="spot-details-page">
      {spots && (
        <>
          <h1>{spots.name}</h1>
        </>
      )}
    </div>
  );
}

export default SpotDetailsPage;
