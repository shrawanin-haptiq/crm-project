import { REGISTER_SUCCESS, LOGIN_SUCCESS, AUTH_ERROR, FETCH_USERS_SUCCESS , ASSIGN_USER_SUCCESS ,ASSIGN_USER_FAILURE} from '../actions/authActions';

const initialState = {
    user: null,
    token: null,
    error: null,
    users : []
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, user: action.payload.user, token: action.payload.token, error: null };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
    case FETCH_USERS_SUCCESS:
         return {
           ...state,
           users: action.payload,
         };
         case ASSIGN_USER_SUCCESS:
            return { ...state, loading: false, error: null };
          case ASSIGN_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default authReducer;
