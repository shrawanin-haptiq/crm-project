import axios from 'axios';

// Action Types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
 export const USER_ERROR = "USER_ERROR";
 
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const FETCH_USERS_SUCCESS ='FETCH_USERS_SUCCESS'
export const ASSIGN_USER_SUCCESS = 'ASSIGN_USER_SUCCESS'
export const ASSIGN_USER_FAILURE = 'ASSIGN_USER_FAILURE'
// API Base URL (Centralized for easier updates)
 const API_BASE_URL = 'http://localhost:5000/api/auth';
//const API_BASE_URL = process.env.REACT_APP_BACKEND_URL
// Register Action
export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Registration failed';
    console.error('Register Error:', errorMessage);
    dispatch({ type: AUTH_ERROR, payload: errorMessage });
  }
};

// Login Action
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    const token = response.data.token;
    // Save the token correctly
localStorage.setItem('authToken', token); // Use `token`, not `data.token`

// Dispatch the login success action
dispatch({ type: LOGIN_SUCCESS, payload: token });
     
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    // console.error('Login Error:', errorMessage);
    dispatch({ type: AUTH_ERROR, payload: errorMessage });
  }
};
 
 
export const getUsers = () => async (dispatch, getState) => {
  try {
    
    const response = await axios.get(` http://localhost:5000/api/auth/users` );
  
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type:  USER_ERROR,
      payload: error.response?.data?.message || 'Failed to fetch stats',
    });
  }
};


 

export const updateLeadAssignedUser = (leadId, userId) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/auth/${leadId}/assign/${userId}`);
    
    dispatch({
      type: ASSIGN_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error assigning user:", error);
    dispatch({
      type: ASSIGN_USER_FAILURE,
      payload: error.message,
    });
  }
};
