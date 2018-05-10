import {
  TRAINER_CLIENT_LIST,
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
		case TRAINER_CLIENT_LIST:   
			let payload = {clientList: action.payload};
			return Object.assign({}, state, {
				clients: payload
			});
			break;
	}
	return state;
}