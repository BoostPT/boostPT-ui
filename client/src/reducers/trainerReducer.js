import {
  TRAINER_CLIENT_LIST,
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
		case TRAINER_CLIENT_LIST:   
			return Object.assign({}, state, {
				clients: action.payload
			});
			break;
	}
	return state;
}