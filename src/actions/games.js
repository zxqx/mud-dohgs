import { fetchGameList } from '../middleware/api';

export const FETCH_GAME_LIST_REQUEST = 'FETCH_GAME_LIST_REQUEST';
export const FETCH_GAME_LIST_REQUEST_SUCCESS = 'FETCH_GAME_LIST_REQUEST_SUCCESS';
export const FETCH_GAME_LIST_REQUEST_FAILURE = 'FETCH_GAME_LIST_REQUEST_FAILURE';
export const UPDATE_GAME_LIST = 'UPDATE_GAME_LIST';

export function fetchGameListRequest() {
  return {
    type: FETCH_GAME_LIST_REQUEST
  };
}

export function fetchGameListRequestSuccess() {
  return {
    type: FETCH_GAME_LIST_REQUEST_SUCCESS
  };
}

export function fetchGameListRequestFailure() {
  return {
    type: FETCH_GAME_LIST_REQUEST_FAILURE
  };
}

export function updateGameList(payload) {
  return {
    type: UPDATE_GAME_LIST,
    payload
  };
}

export function getGameList() {
  return async dispatch => {
    dispatch(fetchGameListRequest());

    try {
      const res = await fetchGameList();
      dispatch(fetchGameListRequestSuccess());
      dispatch(updateGameList(res));
    } catch (e) {
      dispatch(fetchGameListRequestFailure());
    }
  };
}
