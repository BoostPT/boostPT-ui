import {
  AUTH_USER,
  LOGOUT_USER
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return Object.assign({}, state, { user: action.payload });
    case LOGOUT_USER:
      return Object.assign({}, state, { user: undefined });
  }
  return state;
}