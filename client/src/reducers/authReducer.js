import {
  LOGOUT_USER,
  AUTH_USER
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case LOGOUT_USER:
      return Object.assign({}, state, { authenticated: false, user: undefined });
    case AUTH_USER:
      return Object.assign({}, state, {
        authenticated: true, 
        user: action.payload 
      });
      break;
  }
  return state;
}