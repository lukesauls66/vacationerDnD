import './SpotDetails.css';

import { useState, useEffect } from 'react';


function SpotDetails() {

    const [spots, setSpots] = useState([]);
    const [error, setError] = useState(null);

    const fetchSpots = async function fetchSpots() {
        try {
            const response = await fetch('/api/spots');
            const data = await response.json();
            setSpots(data.Spots);
        } catch (err) {
            setError('Failed to load spots');
            console.error(err);
        }
      }

    useEffect(() => {
        fetchSpots();
    }, []);

    if (error) {
        return <div className='error'>{error}</div>
    }
        
    return (
        <div className="spots-container">
            {spots.length > 0 ? (
    spots.map((spot) => {
      return (
        <div key={spot.id} className='spot-card'>
          <img src={spot.previewImage} alt={spot.name} className='spot-image' />
          <div className='spot-details'>
            <div className='spot-top'>
              <div className='spot-location'>
                {spot.city}, {spot.state}
              </div>
              <div className='spot-rating'>⭐ {spot.rating}</div>
            </div>
            <div className='spot-price'>${spot.price} / night</div>
          </div>
        </div>
      );
    })
  ) : (
    <div>No spots available</div>
  )}
</div>
)}
  
export default SpotDetails;