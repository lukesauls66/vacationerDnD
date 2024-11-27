import { csrfFetch } from "./csrf";

const CREATE_SPOT = 'spots/createSpot';
const GET_SPOTS = 'spots/getSpots'

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot,
    };
};

const setSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots,
    };
};

export const createNewSpot = (spotData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spotData),
    });
    const data = await response.json();
    dispatch(createSpot(data.spot));
    return response;
};

export const getSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    dispatch(setSpots(data.spots));
    return response;
};

const initialState = { spots: [] };

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SPOT:
            return { ...state, spots: [...state.spots, action.payload] };
        case GET_SPOTS:
            return { ...state, spots: action.payload };
        default:
            return state;
    }
};

export default spotsReducer;