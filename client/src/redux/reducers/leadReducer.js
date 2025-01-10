import {
  FETCH_LEADS_SUCCESS,
  ADD_LEAD_SUCCESS,
  DELETE_LEAD_SUCCESS,
  UPDATE_LEAD_SUCCESS,
  LEAD_ERROR,
  UPDATE_LEAD_FAILURE,
  
  FETCH_LEADS_REQUEST,
  FETCH_LEADS_FAILURE,
  UPDATE_LEAD_STATUS_REQUEST,
  UPDATE_LEAD_STATUS_SUCCESS,
  UPDATE_LEAD_STATUS_FAILURE,
  
FETCH_STATS_SUCCESS
 } from "../actions/leadActions";

const initialState = {
  leads: [],
  error: null,

  
};

const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    // case FETCH_LEADS_SUCCESS:
    //   return { ...state, leads: action.payload, error: null };
      case FETCH_LEADS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_LEADS_SUCCESS:
        return { ...state, loading: false, leads: action.payload };
      case FETCH_LEADS_FAILURE:
        return { ...state, loading: false, error: action.payload };
    case ADD_LEAD_SUCCESS:
      return { ...state, leads: [action.payload, ...state.leads], error: null };
    case DELETE_LEAD_SUCCESS:
      return { ...state, leads: state.leads.filter((lead) => lead.id !== action.payload), error: null };
      case UPDATE_LEAD_SUCCESS:
  return {
    ...state,
    leads: state.leads.map((lead) =>
      lead.id === action.payload.id ? action.payload : lead
    ),
    error: null,
  };
      case UPDATE_LEAD_FAILURE:
        return { ...state, error: action.payload };
      case LEAD_ERROR:
        return { ...state, error: action.payload };
        case UPDATE_LEAD_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case UPDATE_LEAD_STATUS_SUCCESS:
        console.log("Updated leads:", state.leads.map(lead => lead.id === action.payload.id ? { ...lead, lead_status: action.payload.lead_status } : lead));
        return {
          ...state,
          loading: false,
          leads: state.leads.map((lead) =>
            lead.id === action.payload.id
              ? { ...lead, lead_status: action.payload.lead_status }
              : lead
          ),
        };
         
    case UPDATE_LEAD_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case FETCH_STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload,
      };

      
    default:
      return state;
  }
};

export default leadReducer;
