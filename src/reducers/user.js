import { createReducer } from 'redux-create-reducer';
import * as types from '../actions/user';

const initialState = {
  isLoggedIn: false
};

export default createReducer(initialState, {
  [types.UPDATE_USER](state, action) {
    return {
      isLoggedIn: true,
      attemptedAuthentication: true,
      ...action.payload
    }
  },
  [types.CLEAR_USER](state, action) {
    return {}
  },
  [types.AUTHENTICATE_USER_FAILURE](state, action) {
    return {
      isLoggedIn: false,
      attemptedAuthentication: true
    }
  }
});
