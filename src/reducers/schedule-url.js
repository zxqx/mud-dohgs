import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/schedule-url';

const initialState = {
  scheduleUrl: null,
  loading: false,
  failed: false,
  saved: false
};

export default createReducer(initialState, {
  [types.SET_SCHEDULE_URL](state, action) {
    return {
      ...state,
      scheduleUrl: action.payload
    }
  },
  [types.CLEAR_SCHEDULE_URL_STATE](state) {
    return {
      ...initialState,
      scheduleUrl: state.scheduleUrl
    }
  },
  [types.UPDATE_SCHEDULE_URL_REQUEST](state) {
    return {
      ...state,
      loading: true,
      failed: false,
      saved: false
    };
  },
  [types.UPDATE_SCHEDULE_URL_REQUEST_SUCCESS](state, action) {
    return {
      ...state,
      scheduleUrl: action.url,
      loading: false,
      failed: false,
      saved: true
    };
  },
  [types.UPDATE_SCHEDULE_URL_REQUEST_FAILURE](state) {
    return {
      ...state,
      loading: false,
      failed: true,
      saved: false
    };
  }
});
