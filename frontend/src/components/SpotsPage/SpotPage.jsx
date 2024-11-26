import './SpotPage.css'

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SpotPage() {
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
    <div className='spot-container'>
        <h1 className='spot-header'>{spot.name}</h1>
        <div className='image-container'>
          <div className='preview-image-container'>
              <img src={spot.previewImage} alt={spot.name} />
          </div>

          <div className='image-grid'>
              {spot.SpotImages.slice(1).map(image => (
              <img key={image.id} src={image.url} alt={`Image of ${spot.name}`} />
              ))}
          </div>
        </div>

        <div className="spot-details">
            <p>{spot.description}</p>
        </div>
    </div>
  );
}

export default SpotPage;