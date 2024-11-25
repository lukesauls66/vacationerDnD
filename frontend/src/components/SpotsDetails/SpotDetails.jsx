import { useState, useEffect } from 'react';

function SpotDetails({ spotId }) {
    const [spotDetails, setSpotDetails] = useState(null);

    useEffect(() => {
        fetch(`/api/spots/${spotId}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch spot details');
                return res.json();
            })
            .then((data) => {
                setSpotDetails(data);
            })
            .catch((err) => console.err(err));
    }, [spotId]);

    if (!spotDetails) {
        return <p>Loading spot details...</p>
    }

    return (
        <div>
            <h2>{spotDetails.name}</h2>
            <p>{spotDetails.description}</p>
            <img
                src={spotDetails.previewImage}
                alt={`${spotDetails.name} preview`}
                style={{ width: '100%', borderRadius: '10px' }}
            />
        </div>
    )
}
  
export default SpotDetails;