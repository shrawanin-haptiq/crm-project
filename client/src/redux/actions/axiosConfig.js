import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your API base URL
axios.defaults.baseURL = API_BASE_URL;

// Set the Authorization header for all requests if token is available
const token = localStorage.getItem('authToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
