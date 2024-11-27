import * as sessionActions from '../../store/session';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

function SpotsCreatePage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);

    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [images, setImages] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!sessionUser) {
            alert('You must be logged in to create a spot');
            history.push('/login');
            return;
        }

        if (!country || !street || !city || !lat || !lng || !name || !price) {
            alert('Please fill out all the required fields');
            return;
        }

        const spotData = {
            country,
            street,
            city,
            lat,
            lng,
            description,
            name,
            price,
            images
        };

        dispatch(sessionActions.createSpot(spotData));

        history.push('/spots');
    }

    return (
        <div>
            <h1>Create a New Spot</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Street Address'
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    type='number'
                    placeholder='Latitude'
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    step='0.0001'
                />
                <input
                    type='number'
                    placeholder='Longitude'
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    step='0.0001'
                />
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
                    placeholder='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type='url'
                    placeholder='Preview Image URL'
                    value={images[0]}
                    onChange={(e) => setImages([e.target.value, images[1], images[2], images[3], images[4]])}
                />
                <input
                    type='url'
                    placeholder='Image URL'
                    value={images[1]}
                    onChange={(e) => setImages([images[0], e.target.value, images[2], images[3], images[4]])}
                />
                                <input
                    type='url'
                    placeholder='Image URL'
                    value={images[2]}
                    onChange={(e) => setImages([images[0], images[1] ,e.target.value, images[3], images[4]])}
                />
                                <input
                    type='url'
                    placeholder='Image URL'
                    value={images[3]}
                    onChange={(e) => setImages([images[0], images[1], images[2], e.target.value, images[4]])}
                />
                                <input
                    type='url'
                    placeholder='Image URL'
                    value={images[4]}
                    onChange={(e) => setImages([images[0], images[1], images[2], images[3], e.target.value])}
                />
                <button type='submit'>Create Spot</button>
            </form>
        </div>
    )


}