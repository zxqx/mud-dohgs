import * as api from '../middleware/api';

export const SET_SCHEDULE_URL = 'SET_SCHEDULE_URL';
export const UPDATE_SCHEDULE_URL_REQUEST = 'UPDATE_SCHEDULE_URL_REQUEST';
export const UPDATE_SCHEDULE_URL_REQUEST_SUCCESS = 'UPDATE_SCHEDULE_URL_REQUEST_SUCCESS';
export const UPDATE_SCHEDULE_URL_REQUEST_FAILURE = 'UPDATE_SCHEDULE_URL_REQUEST_FAILURE';
export const CLEAR_SCHEDULE_URL_STATE = 'CLEAR_SCHEDULE_URL_STATE';

export function getScheduleUrl() {
  return async dispatch => {
    const res = await api.fetchScheduleUrl();
    dispatch(setScheduleUrl(res.scheduleUrl));
  };
}

export function setScheduleUrl(payload) {
  return {
    type: SET_SCHEDULE_URL,
    payload
  };
}

export function updateScheduleUrlRequest() {
  return {
    type: UPDATE_SCHEDULE_URL_REQUEST
  };
}

export function updateScheduleUrlRequestSuccess(url) {
  return {
    type: UPDATE_SCHEDULE_URL_REQUEST_SUCCESS,
    url
  };
}

export function updateScheduleUrlRequestFailure() {
  return {
    type: UPDATE_SCHEDULE_URL_REQUEST_FAILURE
  };
}

export function updateScheduleUrl(url, password) {
  return async dispatch => {
    try {
      dispatch(updateScheduleUrlRequest());
      await api.setScheduleUrl(url, password);
      dispatch(updateScheduleUrlRequestSuccess(url));
    } catch (e) {
      dispatch(updateScheduleUrlRequestFailure());
    }
  };
}

export function clearScheduleUrlState() {
  return {
    type: CLEAR_SCHEDULE_URL_STATE
  };
}
