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
} from "./types";
import { BACK_URI } from "../config/keys";

// Get Logs from server
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`/api/logs`);
    const data = await res.json();
    const count = data.length;

    dispatch({
      type: GET_LOGS,
      payload: data,
      count: count,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response,
    });
  }
};

// Add Log to server
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/api/logs`, {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response,
    });
  }
};

// Delete Log from server
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();
    await fetch(`/api/logs/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response,
    });
  }
};

// Update Log from server
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/api/logs/${log._id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response,
    });
  }
};

// Search Logs
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`/api/logs/search?searchterm=${text}`);
    const data = await res.json();
    const count = data.length;

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
      count: count,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response,
    });
  }
};

// Set Current Log for updation
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// Clear Current Log for updation
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

// Set Loading to True
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
