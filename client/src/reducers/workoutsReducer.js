import {
  FETCH_WORKOUTS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_WORKOUTS:
      return Object.assign({}, state, { workouts: action.payload });
  }
  return state;
}