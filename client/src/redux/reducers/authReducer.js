import { REGISTER_SUCCESS, LOGIN_SUCCESS, AUTH_ERROR } from '../actions/authActions';

const initialState = {
    user: null,
    token: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, user: action.payload.user, token: action.payload.token, error: null };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
   
        
        default:
            return state;
    }
};

export default authReducer;
