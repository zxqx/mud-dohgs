import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/games';

const initialState = {
  data: [],
  raw: '',
  loading: false,
  failed: false
};

export default createReducer(initialState, {
  [types.FETCH_GAME_LIST_REQUEST](state) {
    return {
      ...state,
      loading: true,
      failed: false
    };
  },
  [types.FETCH_GAME_LIST_REQUEST_SUCCESS](state) {
    return {
      ...state,
      loading: false
    };
  },
  [types.FETCH_GAME_LIST_REQUEST_FAILURE](state) {
    return {
      ...state,
      loading: false,
      failed: true
    };
  },
  [types.UPDATE_GAME_LIST](state, action) {
    return action.payload;
  }
});
