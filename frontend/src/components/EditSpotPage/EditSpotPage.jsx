import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { csrfFetch } from "../../store/csrf";

function EditSpotPage() {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [spotDetails, setSpotDetails] = useState(null);
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSpotDetails = async () => {
      try {
        const res = await csrfFetch(`/api/spots/${spotId}`);
        if (res.ok) {
          const data = await res.json();
          setSpotDetails(data);
          setCountry(data.country);
          setAddress(data.address);
          setCity(data.city);
          setState(data.state);
          setDescription(data.description);
          setName(data.name);
          setPrice(data.price);
        } else {
          console.error("Spot not found");
        }
      } catch (error) {
        console.error("Failed to fetch spot details:", error);
      }
    };

    fetchSpotDetails();
  }, [spotId]);

  const spotCreationValidationErrors = ({
    country,
    address,
    city,
    state,
    description,
    name,
    price,
  }) => {
    const newValidationErrors = {};

    if (!country) {
      newValidationErrors.country = "Country is required";
    }
    if (!address) {
      newValidationErrors.address = "Address is required";
    }
    if (!city) {
      newValidationErrors.city = "City is required";
    }
    if (!state) {
      newValidationErrors.state = "State is required";
    }
    if (description.length < 30) {
      newValidationErrors.description =
        "Description needs 30 or more characters";
    }
    if (!name) {
      newValidationErrors.name = "Name is required";
    }
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice < 1) {
      newValidationErrors.price = "Price per night must be a positive number";
    }

    return newValidationErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const spotCreationClientSideErrors = spotCreationValidationErrors({
      country,
      address,
      city,
      state,
      description,
      name,
      price,
    });

    if (Object.keys(spotCreationClientSideErrors).length > 0) {
      setErrors(spotCreationClientSideErrors);
      return;
    }

    try {
      const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country,
          address,
          city,
          state,
          description,
          name,
          price,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error:", errorData);
      }

      const data = await res.json();
      if (data.id) {
        navigate(`/spots/${data.id}`);
      } else {
        console.error("Unable to update spot");
        setErrors((prevErrors) => ({
          ...prevErrors,
          serverError: "Unable to update spot",
        }));
      }
    } catch (err) {
      console.error("Error: ", err);
      setErrors((prevErrors) => ({
        ...prevErrors,
        serverError: err.message || "An unexpected error occurred",
      }));
    }
  };

  if (!spotDetails) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="spot-creation-page-container">
      <form className="spot-creation-form-container" onSubmit={onSubmit}>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          {errors?.description && (
            <p className="new-spot-credential-error">{errors.description}</p>
          )}
        </div>
        <div className="spot-creation-form-section-3">
          <div className="spot-creation-form-section-3-description">
            <h3>Create a title for your spot</h3>
            <p>
              Catch guests&apos; attention with a spot title that highlights
              what makes your place special.
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {errors?.name && (
            <p className="new-spot-credential-error">{errors.name}</p>
          )}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
          </div>
          {errors?.price && (
            <p className="new-spot-credential-error">{errors.price}</p>
          )}
        </div>
        <div className="spot-creation-form-section-5">
          <div className="spot-creation-form-section-5-description">
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot.</p>
          </div>
          <div className="spot-creation-form-image-url-input-container">
            <label htmlFor="Images">
              <input
                id="Images"
                className="spot-creation-form-image-url-input"
                type="file"
                multiple
              />
            </label>
          </div>
        </div>
        <div className="spot-creation-form-section-6">
          <button className="spot-creation-form-submit" type="submit">
            Create Spot
          </button>
        </div>
        {errors.serverError && (
          <p className="server-error">{errors.serverError}</p>
        )}
      </form>
    </div>
  );
}

export default EditSpotPage;
