import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./SpotCreationForm.css";

function SpotCreationFormPage() {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [spotDescription, setSpotDescription] = useState("");
  const [spotName, setSpotName] = useState("");
  const [spotPrice, setSpotPrice] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");

  return (
    <div className="spot-creation-page-container">
      <form className="spot-creation-form-container">
        <div className="spot-creation-form-section-1">
          <h1>Create a new Spot</h1>
          <div className="spot-creation-form-section-1-description">
            <h3>Where&apos;s your place located?</h3>
            <p>
              Guests will only get your exact address once they booked a
              reservation.
            </p>
          </div>
          <div className="spot-creation-form-section-1-input-section">
            <label className="spot-creation-form-country-input-container">
              Country
              <input
                className="spot-creation-form-country-input"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </label>
            <label className="spot-creation-form-address-input-container">
              Street Address
              <input
                className="spot-creation-form-address-input"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>
            <div className="spot-creation-form-city-state-input-container">
              <label className="spot-creation-form-city-input-container">
                City
                <input
                  className="spot-creation-form-city-input"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </label>
              <p>, </p>
              <label className="spot-creation-form-state-input-container">
                State
                <input
                  className="spot-creation-form-state-input"
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="spot-creation-form-lat-long-input-container">
              <label className="spot-creation-form-lat-input-container">
                Latitude
                <input
                  className="spot-creation-form-lat-input"
                  type="text"
                  placeholder="Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </label>
              <p>, </p>
              <label
                htmlFor="longitude"
                className="spot-creation-form-long-input-container"
              >
                Longitude
                <input
                  id="longitude"
                  className="spot-creation-form-long-input"
                  type="text"
                  placeholder="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="spot-creation-form-section-2">
          <div className="spot-creation-form-section-2-description">
            <h3>Describe your place to guests</h3>
            <p>
              Mention the best features of your space, any special amentities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>
          </div>
          <label
            htmlFor="spot-description"
            className="spot-creation-form-spot-description-input-container"
          >
            <textarea
              id="spot-description"
              className="spot-creation-form-spot-description-input"
              type="text"
              placeholder=" Please write at least 30 characters"
              value={spotDescription}
              onChange={(e) => setSpotDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="spot-creation-form-section-3">
          <div className="spot-creation-form-section-3-description">
            <h3>Create a title for your spot</h3>
            <p>
              Catch guests' attention with a spot title that highlights what
              makes your place special.
            </p>
          </div>
          <label
            htmlFor="spot-name"
            className="spot-creation-form-spot-name-input-container"
          >
            <input
              id="spot-name"
              className="spot-creation-form-spot-name-input"
              type="text"
              placeholder="Name of your spot"
              value={spotName}
              onChange={(e) => setSpotName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="spot-creation-form-section-4">
          <div className="spot-creation-form-section-4-description">
            <h3>Set a base price for your spot</h3>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
          </div>
          <div className="spot-creation-form-spot-price-input-container">
            <p>$</p>
            <label htmlFor="spot-price">
              <input
                id="spot-price"
                className="spot-creation-form-spot-price-input"
                type="text"
                placeholder="Price per night (USD)"
                value={spotPrice}
                onChange={(e) => setSpotPrice(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
        <div className="spot-creation-form-section-5">
          <div className="spot-creation-form-section-5-description">
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot.</p>
          </div>
          <div className="spot-creation-form-image-url-input-container">
            <label htmlFor="previewUrl">
              <input
                id="previewUrl"
                className="spot-creation-form-image-url-input"
                type="text"
                placeholder="Preview Image URL"
                value={previewUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
              />
            </label>
            <label htmlFor="imageUrl1">
              <input
                id="imageUrl1"
                className="spot-creation-form-image-url-input"
                type="text"
                placeholder="Image URL"
                value={imageUrl1}
                onChange={(e) => setImageUrl1(e.target.value)}
              />
            </label>
            <label htmlFor="imageUrl2">
              <input
                id="imageUrl2"
                className="spot-creation-form-image-url-input"
                type="text"
                placeholder="Image URL"
                value={imageUrl2}
                onChange={(e) => setImageUrl2(e.target.value)}
              />
            </label>
            <label htmlFor="imageUrl3">
              <input
                id="imageUrl3"
                className="spot-creation-form-image-url-input"
                type="text"
                placeholder="Image URL"
                value={imageUrl3}
                onChange={(e) => setImageUrl3(e.target.value)}
              />
            </label>
            <label htmlFor="imageUrl4">
              <input
                id="imageUrl4"
                className="spot-creation-form-image-url-input"
                type="text"
                placeholder="Image URL"
                value={imageUrl4}
                onChange={(e) => setImageUrl4(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="spot-creation-form-section-6">
          <button className="spot-creation-form-submit">Create Spot</button>
        </div>
      </form>
    </div>
  );
}

export default SpotCreationFormPage;

// export const createASpot = createAsyncThunk(
//     "spots/createASpot",
//     async (
//       {
//         country,
//         address,
//         city,
//         state,
//         latitude,
//         longitude,
//         description,
//         name,
//         price,
//         previewImage,
//       },
//       { rejectWithValue }
//     ) => {
//       try {
//         const res = await csrfFetch("/api/spots", {
//           method: "POST",
//           body: JSON.stringify({
//             country,
//             address,
//             city,
//             state,
//             latitude,
//             longitude,
//             description,
//             name,
//             price,
//             previewImage,
//           }),
//         });

//         const data = await res.json();
//         console.log("data:", data);
//         return data;
//       } catch (err) {
//         const errorData = await err.json();
//         const backendErrors = errorData.errors;
//         return rejectWithValue(backendErrors);
//       }
//     }
//   );
