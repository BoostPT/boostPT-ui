import { FETCH_EVENTS } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return Object.assign({}, state, { events: action.payload });
  }
  return state;
}