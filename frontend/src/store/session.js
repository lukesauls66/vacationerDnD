import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


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



const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};


export default sessionReducer;

// const SET_USER = 'session/setUser';
// const REMOVE_USER = 'session/removeUser';

// export const setUser = (user) => ({
//     type: SET_USER,
//     payload: user
// });

// export const removeUser = () => ({
//     type: REMOVE_USER
// })


// export const login = (user) => async (dispatch) => {
//     const { credential, password } = user;
//     const res = await csrfFetch('/api/session/login', {
//         method: 'POST',
//         body: JSON.stringify({ credential, password }),
//     });
//     const data = await res.json();
//     dispatch(setUser(data.user));
//     return res;

    // if (res.ok) {
    //     const userData = await res.json();
    //     dispatch(setUser(userData.user));
    //     return res;
    // } else {
    //     throw new Error('Failed to log in');
    // }
// };

// export const restoreUser = () => async (dispatch) => {
//     const res = await csrfFetch('/api/session');
//     const data = await res.json();
//     if (data.user) {
//         dispatch(setUser(data.user));
//     }
// }

// const initialState = { user: null };

// const sessionReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case SET_USER:
//             return { ...state, user: action.payload };
//         case REMOVE_USER:
//             return { ...state, user: null };
//         default:
//             return state;
//     }
// };

// export default sessionReducer;

