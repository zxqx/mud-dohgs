import { fetchStandings } from '../middleware/api';

export const FETCH_STANDINGS_REQUEST = 'FETCH_STANDINGS_REQUEST';
export const FETCH_STANDINGS_SUCCESS = 'FETCH_STANDINGS_SUCCESS';
export const FETCH_STANDINGS_FAILURE = 'FETCH_STANDINGS_FAILURE';
export const UPDATE_STANDINGS = 'UPDATE_STANDINGS';

export function fetchStandingsRequest() {
  return {
    type: FETCH_STANDINGS_REQUEST
  };
}

export function fetchStandingsSuccess() {
  return {
    type: FETCH_STANDINGS_SUCCESS
  };
}

export function fetchStandingsFailure() {
  return {
    type: FETCH_STANDINGS_FAILURE
  };
}

export function updateStandings(payload) {
  return {
    type: UPDATE_STANDINGS,
    payload
  };
}

export function getStandings() {
  return async dispatch => {
    dispatch(fetchStandingsRequest());

    try {
      const res = await fetchStandings();
      dispatch(fetchStandingsSuccess());
      dispatch(updateStandings(res));
    } catch (e) {
      dispatch(fetchStandingsFailure());
    }
  };
}
