import { browserHistory } from 'react-router';
import { auth, provider } from '../config/server';

export const UPDATE_USER = 'UPDATE_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE';

export function redirectToGoogleLogin() {
  auth().signInWithRedirect(provider);
}

export function authenticateUser() {
  return async dispatch => {
    auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(updateUser(user));
      }
      else {
        dispatch(authenticateUserFailure());
      }
    });
  }
}

export function authenticateUserFailure() {
  return {
    type: AUTHENTICATE_USER_FAILURE
  };
}

export function updateUser(payload) {
  return {
    type: UPDATE_USER,
    payload
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER
  };
}

export function logoutUser() {
  return async dispatch => {
    auth().signOut().then(() => {
      dispatch(clearUser());
      browserHistory.push('/');
    });
  }
}
