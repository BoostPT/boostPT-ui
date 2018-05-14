import {
  AUTH_USER,
  AUTH_ERROR,
  LOGOUT_USER
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return Object.assign({}, state, { user: action.payload, error: '' });
    case AUTH_ERROR:
      console.log('err', action.payload)
      return Object.assign({}, state, { user: action.payload, error: action.payload });
    case LOGOUT_USER:
      return Object.assign({}, state, { user: undefined, error: '' });
  }
  return state;
}