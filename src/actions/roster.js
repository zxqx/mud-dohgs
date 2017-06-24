import * as api from '../middleware/api';

export const FETCH_ROSTER_REQUEST = 'FETCH_ROSTER_REQUEST';
export const FETCH_ROSTER_REQUEST_SUCCESS = 'FETCH_ROSTER_REQUEST_SUCCESS';
export const FETCH_ROSTER_REQUEST_FAILURE = 'FETCH_ROSTER_REQUEST_FAILURE';
export const UPDATE_SCHEDULE_URL_REQUEST = 'UPDATE_SCHEDULE_URL_REQUEST';
export const UPDATE_SCHEDULE_URL_REQUEST_SUCCESS = 'UPDATE_SCHEDULE_URL_REQUEST_SUCCESS';
export const UPDATE_SCHEDULE_URL_REQUEST_FAILURE = 'UPDATE_SCHEDULE_URL_REQUEST_FAILURE';
export const UPDATE_ROSTER = 'UPDATE_ROSTER';

export function fetchRosterRequest() {
  return {
    type: FETCH_ROSTER_REQUEST
  };
}

export function fetchRosterRequestSuccess(payload) {
  return {
    type: FETCH_ROSTER_REQUEST_SUCCESS,
    payload
  };
}

export function fetchRosterRequestFailure() {
  return {
    type: FETCH_ROSTER_REQUEST_FAILURE
  };
}

export function getRoster() {
  return async dispatch => {
    dispatch(fetchRosterRequest());

    try {
      const res = await api.fetchRoster();
      dispatch(fetchRosterRequestSuccess(res));
    } catch (e) {
      dispatch(fetchRosterRequestFailure());
    }
  };
}

export function updateRoster(payload) {
  return {
    type: UPDATE_ROSTER,
    payload
  };
}

export function setRoster(roster) {
  return async dispatch => {
    await api.setRoster(roster);
    dispatch(updateRoster(roster));
  };
}
