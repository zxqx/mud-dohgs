import { fetchGameList } from '../middleware/api';

export const UPDATE_GAME_LIST = 'UPDATE_GAME_LIST';

export function updateGameList(payload) {
  return {
    type: UPDATE_GAME_LIST,
    payload
  };
}

export function getGameList() {
  return async dispatch => {
    const res = await fetchGameList();
    dispatch(updateGameList(res));
  };
}
