import { createReducer } from 'redux-create-reducer';
import { UPDATE_GAME_LIST } from '../actions/games';

const initialState = {
  data: [],
  raw: ''
};

export default createReducer(initialState, {
  [UPDATE_GAME_LIST](state, action) {
    return action.payload;
  }
});
