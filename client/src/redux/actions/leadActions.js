import axios from "axios";
 

// Action Types
export const FETCH_LEADS_SUCCESS = "FETCH_LEADS_SUCCESS";
export const ADD_LEAD_SUCCESS = "ADD_LEAD_SUCCESS";
export const DELETE_LEAD_SUCCESS = "DELETE_LEAD_SUCCESS";
export const UPDATE_LEAD_SUCCESS = "UPDATE_LEAD_SUCCESS";
export const LEAD_ERROR = "LEAD_ERROR";
 export const UPDATE_LEAD_FAILURE = "UPDATE_LEAD_FAILURE";
 export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS'
 export const FETCH_LEADS_REQUEST = 'FETCH_LEADS_REQUEST'
 export const FETCH_LEADS_FAILURE = 'FETCH_LEADS_REQUEST'
 export const FETCH_STATS_SUCCES = 'FETCH_STATS_SUCCES' 
 // API Base URL
const API_BASE_URL = "http://localhost:5000/api/leads";

// Fetch Leads Action
// export const fetchLeads = () => async (dispatch, getState) => {
//   try {
//     const token = getState().auth.token; // Assuming token is stored in Redux state
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const response = await axios.get(`${API_BASE_URL}`, config);
//     dispatch({ type: FETCH_LEADS_SUCCESS, payload: response.data });
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || "Failed to fetch leads";
//     dispatch({ type: LEAD_ERROR, payload: errorMessage });
//   }
// };

// export const fetchLeads = () => async (dispatch, getState) => {
//   try {
//     const token = localStorage.getItem("authToken");  // Get token from localStorage
//     if (!token) {
//       return dispatch({
//         type: "LEAD_ERROR",
//         payload: "Authorization token is missing",
//       });
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,  // Send token in Authorization header
//       },
//     };

//     const response = await axios.get(`${API_BASE_URL}`, config);  // API call
//     dispatch({
//       type: "FETCH_LEADS_SUCCESS",
//       payload: response.data,
//     });
//     // Dispatch the successful leads fetch action
//     dispatch({
//       type: FETCH_LEADS_SUCCESS,
//       payload: response.data, // The leads data from the API
//     });
//   } catch (error) {
//     // Handle the error and send a user-friendly message
//     const errorMessage =
//       error.response?.data?.message ||
//       error.message ||
//       'Failed to fetch leads'; // Provide default error message

//     // Dispatch the error action with the error message
//     dispatch({
//       type: LEAD_ERROR,
//       payload: errorMessage,
//     });

//     // Optionally, you can log the error for debugging purposes
//     console.error('Error fetching leads:', error);
//   }
// };

 

const getAuthToken = () => localStorage.getItem('authToken');

export const fetchLeads = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_LEADS_REQUEST" });

    const token = getAuthToken(); // Get the token from localStorage
    const { data } = await axios.get(`${API_BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: "FETCH_LEADS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_LEADS_FAIL", payload: error.message });
  }
};





// Add Lead Action
export const addLead = (leadData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken"); // Token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(`${API_BASE_URL}`, leadData, config);
    dispatch({ type: ADD_LEAD_SUCCESS, payload: response.data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to add lead";
    dispatch({ type: LEAD_ERROR, payload: errorMessage });
  }
};

// Delete Lead Action
export const deleteLead = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${API_BASE_URL}/${id}`, config);
    dispatch({ type: DELETE_LEAD_SUCCESS, payload: id });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to delete lead";
    dispatch({ type: LEAD_ERROR, payload: errorMessage });
  }
};

// Update Lead Action
export const updateLead = (lead) => async (dispatch) => {
  try {
    // Extract lead ID and the rest of the data
    const { id, ...leadData } = lead;

    console.log("Updating lead with data:", leadData);
    console.log("Endpoint:", `${API_BASE_URL}/${id}`);

    // Send PUT request without Authorization header
    const response = await axios.put(`${API_BASE_URL}/${id}`, leadData);

    dispatch({ type: UPDATE_LEAD_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Failed to update lead:", error.response?.data || error.message);
    dispatch({ type: UPDATE_LEAD_FAILURE, payload: error.message });
  }
};

 

 

 
// export const updateLeadStatus = (id, lead_status) => async (dispatch) => {
//   try {
//     // Send only the lead_status in the request bod\
//     const response = await axios.put(`${API_BASE_URL}/leads/${id}`, 
//       lead_status,
//       // Provide default values if required by the A

//     );
    

//     // Dispatch success action with the updated lead data
//     dispatch({ type: FETCH_STATS_SUCCESS , payload: response.data });
//   } catch (error) {
//     // Log the complete error response for debugging
//     console.error("Error response:", error.response);

//     // Provide a more detailed error message (fallback to generic message if no specific message is found)
//     const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
    
//     // Dispatch error action with the error message
//     dispatch({ type: LEAD_ERROR, payload: errorMessage });
//   }
// };

 
export const UPDATE_LEAD_STATUS_REQUEST = "UPDATE_LEAD_STATUS_REQUEST";
export const UPDATE_LEAD_STATUS_SUCCESS = "UPDATE_LEAD_STATUS_SUCCESS";
export const UPDATE_LEAD_STATUS_FAILURE = "UPDATE_LEAD_STATUS_FAILURE";
export const ASSIGN_USER_SUCCESS = 'ASSIGN_USER_SUCCESS'
export const ASSIGN_USER_FAILURE = 'ASSIGN_USER_FAILURE'
// Action to update only the lead's status
export const updateLeadStatus = (id, lead_status) => async (dispatch) => {
  dispatch({ type: "UPDATE_LEAD_STATUS_REQUEST" });
console.log(id , lead_status )
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${id}`,
      { lead_status }, // Ensure this contains all required fields
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response)

    dispatch({
      type: "UPDATE_LEAD_STATUS_SUCCESS",
      payload: { id, lead_status },
    });
  } catch (error) {
    console.error("Error updating lead status:", error.response?.data || error.message);
    dispatch({
      type: "UPDATE_LEAD_STATUS_FAILURE",
      payload: error.response?.data?.message || "Failed to update lead status",
    });
  }
};



// Action to fetch statistics
export const getStats = () => async (dispatch, getState) => {
  try {
    
    const response = await axios.get(`${API_BASE_URL}/stats` );
    dispatch({
      type: FETCH_STATS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: LEAD_ERROR,
      payload: error.response?.data?.message || 'Failed to fetch stats',
    });
  }
};


export const updateLeadAssignedUser = (leadId, userId) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/leads/${leadId}/assign`,
      { userId } // Sending userId in the request body
    );

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
