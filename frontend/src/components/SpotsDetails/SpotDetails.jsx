import './SpotDetails.css';

import { useState, useEffect } from 'react';
import LandingPage from '../LandingPage/LandingPage';

function SpotDetails() {
    const [spots, setSpots] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/spots');

                if (response.ok) {
                    throw new Error('Failed to fetch spot details');
                }
                const data = await response.json();
                setSpots(data.slice(0, 5));
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        }

        fetchData();
    }, []);

    if (error) {
        return <p>Error fetching spots: {error}</p>
    }

    if (!spots) {
        return <p>Loading spot details...</p>
    }

    const getSpotPreviewImage = (spot) => {
        if (!spot?.SpotImages?.length) return null;
        const previewImage = spot.SpotImages.find((image) => image.preview)
        return previewImage?.url || null;
    };

    return <LandingPage spots={spots} getSpotPreviewImage={getSpotPreviewImage} />;
}
  
export default SpotDetails;