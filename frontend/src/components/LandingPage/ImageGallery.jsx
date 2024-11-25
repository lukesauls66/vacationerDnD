import { useState, useEffect } from 'react';

function ImageGallery() {
    const [spotImages, setSpotImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchSpotImages = async () => {
        try {
          const response = await fetch('/api/spots');
          const spots = await response.json();
          const allSpotImages = spots.map(spot => spot.SpotImages).flat(); // Combine all spot images
          setSpotImages(allSpotImages);
          setIsLoading(false);
        } catch (error) {
          setError(error);
          setIsLoading(false);
        }
      };
  
      fetchSpotImages();
    }, []);
  
    return (
      <div className='image-gallery'>
        {isLoading ? (
          <p>Loading images...</p>
        ) : error ? (
          <p>Error fetching images: {error.message}</p>
        ) : (
          spotImages.length > 0 ? ( // Check if there are any images
            spotImages.map((spotImage, index) => (
              spotImage.preview && ( // Check for preview property
                <img key={index} src={spotImage.url} alt={`Spot ${index + 1}`} />
              )
            ))
          ) : (
            <p>No images available for this spot.</p>
          )
        )}
      </div>
    );
}
  
export default ImageGallery;