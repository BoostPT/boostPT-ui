import {
  TRAINER_CLIENT_LIST,
  FETCH_TRAINERS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case TRAINER_CLIENT_LIST:   
      return Object.assign({}, state, { clients: action.payload });
    case FETCH_TRAINERS:
      return Object.assign({}, state, { trainers: action.payload });
  }
	return state;
}