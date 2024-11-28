import './SpotCreatePage.css';

import * as sessionActions from '../../store/session';

import { useState } from 'react';
import { useDispatch } from 'react-redux'


function SpotCreatePage() {
    const dispatch = useDispatch();


    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [images, setImages] = useState(['', '', '', '']);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const spotData = {
            country,
            address,
            city,
            state,
            lat,
            lng,
            description,
            name,
            price,
            previewImage,
            images
        };

        await dispatch(sessionActions.createUserSpot(spotData));
    };

    return (
        <div>
            <h1>Create a New Spot</h1>
            <form className='create-spot-form' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Street Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <div className='city-state-container'>
                    <input
                        type='text'
                        placeholder='City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <span>, </span>
                    <input
                        type='text'
                        placeholder='State'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <div className='lat-lng-container'>
                    <input
                        type='number'
                        placeholder='Latitude'
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        step='0.0001'
                    />
                    <span>, </span>
                    <input
                        type='number'
                        placeholder='Longitude'
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        step='0.0001'
                    />
                </div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Enter a description'
                />
                <input
                    type='text'
                    placeholder='Title'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type='number'
                    placeholder='Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type='url'
                    placeholder='Preview Image'
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                />
                {images.map((image, index) => (
                    <input
                        key={index}
                        type='url'
                        placeholder={`Image URL ${index + 1}`}
                        value={image}
                        onChange={(e) => {
                            const updatedImages = [...images];
                            updatedImages[index] = e.target.value;
                            setImages(updatedImages);
                        }}
                    />
                ))}
                <button type='submit'>Create Spot</button>
            </form>
        </div>
    )
}


export default SpotCreatePage;
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!sessionUser) {
//             alert('You must be logged in to create a spot');
//             history.push('/login');
//             return;
//         }

//         if (!country || !street || !city || !lat || !lng || !name || !price) {
//             alert('Please fill out all the required fields');
//             return;
//         }

//         const spotData = {
//             country,
//             street,
//             city,
//             lat,
//             lng,
//             description,
//             name,
//             price,
//             images
//         };

//         const response = dispatch(spotActions.createNewSpot(spotData));

//         if (response.ok) {
//             history.push('/spots');
//         } else {
//             alert('There was an error creating the spot');
//         }

//     }

//     return (
//         <div>
//             <h1>Create a New Spot</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type='text'
//                     placeholder='Country'
//                     value={country}
//                     onChange={(e) => setCountry(e.target.value)}
//                 />
//                 <input
//                     type='text'
//                     placeholder='Street Address'
//                     value={street}
//                     onChange={(e) => setStreet(e.target.value)}
//                 />
//                 <input
//                     type='text'
//                     placeholder='City'
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                 />
//                 <input
//                     type='number'
//                     placeholder='Latitude'
//                     value={lat}
//                     onChange={(e) => setLat(e.target.value)}
//                     step='0.0001'
//                 />
//                 <input
//                     type='number'
//                     placeholder='Longitude'
//                     value={lng}
//                     onChange={(e) => setLng(e.target.value)}
//                     step='0.0001'
//                 />
//                 <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder='Enter a description'
//                 />
//                 <input
//                     type='text'
//                     placeholder='Title'
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 <input
//                     type='number'
//                     placeholder='price'
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                 />
//                 {images.map((image, index) => (
//                     <input
//                         key={index}
//                         type='url'
//                         placeholder={`Image URL ${index + 1}`}
//                         value={image}
//                         onChange={(e) => {
//                             const updatedImages = [...images];
//                             updatedImages[index] = e.target.value;
//                             setImages(updatedImages);
//                         }}
//                     />
//                 ))}
//                 <button type='submit'>Create Spot</button>
//             </form>
//         </div>
//     )
// }

// export default SpotCreatePage;