import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SIGNUP_USER = 'users/signupUser';
const GET_USER_SPOTS = 'session/getUserSpots';


const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

const setUserSpots = (spots) => {
    return {
        type: GET_USER_SPOTS,
        payload: spots
    }
}

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};


export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session/login', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;    
}


export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
}

export const getUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/session/spots');
    const data = await response.json();
    if (data.spots) {
        dispatch(setUserSpots(data.spots));
    }
    return response;
}

const initialState = { 
    user: null, 
    userSpots: []
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        case SIGNUP_USER:
            return { ...state, user: action.payload };
        case GET_USER_SPOTS:
            return { ...state, userSpots: action.payload };
        default:
            return state;
    }
};


export default sessionReducer;

