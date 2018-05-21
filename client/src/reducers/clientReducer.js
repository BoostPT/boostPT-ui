import { 
  FETCH_TRAINERS,
  FETCH_REQUESTS_IN,
  FETCH_REQUESTS_OUT,
  DELETE_REQUEST
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_TRAINERS:
      return Object.assign({}, state, { trainers: action.payload });
    case FETCH_REQUESTS_IN:
      return Object.assign({}, state, { requestsIn: action.payload });
    case FETCH_REQUESTS_OUT:
      return Object.assign({}, state, { requestsOut: action.payload });
    case DELETE_REQUEST:
    return Object.assign({}, state, { requestsIn: action.payload });
  }
  return state;
}