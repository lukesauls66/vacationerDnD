import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage({ spots, getSpotPreviewImage }) {
    const navigate = useNavigate();
    return (
        <div className='spot-grid'>
          {spots && spots.length > 0 ? (
            spots.map((spot) => (
              <div key={spot.id} className='spot-card'>
                <img
                  src={getSpotPreviewImage(spot.id) || 'default-spot-image.jpg'}
                  alt={`${spot.city}, ${spot.state}`}
                  className='spot-image'
                  onClick={() => navigate(`/spots/${spot.id}`)}
                />
                <div className='spot-info'>
                  <p>{spot.city}, {spot.state}</p>
                  <p>{spot.price} / night</p>
                  <p>⭐ {spot.rating}</p>
                  {/* Add more info based on your data structure */}
                  <p>{spot.guests} Guests</p>
                  <p>{spot.amenities.join(', ')}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No spots found.</p>
          )}
        </div>
      );
}

export default LandingPage;