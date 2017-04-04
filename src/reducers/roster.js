import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/roster';

const initialState = {
  data: [],
  loading: false,
  failed: false,
  saved: false
};

export default createReducer(initialState, {
  [types.FETCH_ROSTER_REQUEST](state) {
    return {
      ...state,
      loading: true,
      failed: false
    };
  },
  [types.FETCH_ROSTER_REQUEST_SUCCESS](state, action) {
    return {
      ...state,
      loading: false,
      data: action.payload
    };
  },
  [types.FETCH_ROSTER_REQUEST_FAILURE](state) {
    return {
      ...state,
      loading: false,
      failed: true
    };
  }
});
