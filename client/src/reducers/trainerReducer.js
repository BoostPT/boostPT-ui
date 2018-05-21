import {
  TRAINER_CLIENT_LIST,
  ADD_CONNECTION
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case TRAINER_CLIENT_LIST:   
      return Object.assign({}, state, { clients: action.payload });
    case ADD_CONNECTION:
      return Object.assign({}, state, { clients: action.payload });
  }
	return state;
}