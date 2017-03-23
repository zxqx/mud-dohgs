import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/standings';

const initialState = {
  data: [],
  loading: false,
  failed: false
};

export default createReducer(initialState, {
  [types.FETCH_STANDINGS_REQUEST](state) {
    return {
      ...state,
      loading: true,
      failed: false
    };
  },
  [types.FETCH_STANDINGS_SUCCESS](state) {
    return {
      ...state,
      loading: false,
      failed: false
    };
  },
  [types.FETCH_STANDINGS_FAILURE](state) {
    return {
      ...state,
      loading: false,
      failed: true
    };
  },
  [types.UPDATE_STANDINGS](state, action) {
    return {
      ...state,
      ...action.payload
    }
  }
});
