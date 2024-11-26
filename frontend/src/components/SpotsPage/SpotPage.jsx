import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SpotDetails() {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const response = await fetch(`/api/spots/${spotId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch spot');
        }
        const data = await response.json();
        setSpot(data);
      } catch (err) {
        setError('Failed to load spot: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpot();
  }, [spotId]);

  if (isLoading) {
    return <div>Loading spot...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!spot) {
    return <div>No spot found for ID: {spotId}</div>;
  }

  return (
    <div className="spot-details">
      <h1>{spot.name}</h1>
      <img src={spot.previewImage} alt={spot.name} />
      <p>{spot.description}</p>
      {/* ... other spot details ... */}
    </div>
  );
}

export default SpotDetails;