import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk }from 'redux-thunk';
import authReducer from './reducers/authReducer';
import leadReducer from "./reducers/leadReducer";
  

const rootReducer = combineReducers({
    auth: authReducer,
    leads: leadReducer,
     
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
