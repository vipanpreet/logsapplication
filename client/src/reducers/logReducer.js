import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from "../actions/types";

const initalState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
        count: action.count,
      };

    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false,
      };

    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log._id !== action.payload),
        loading: false,
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map((log) =>
          log._id === action.payload._id ? action.payload : log
        ),
      };

    case SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload,
        count: action.count,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
