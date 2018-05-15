import {
  FETCH_WORKOUTS, 
  SELECT_WORKOUT,
  DELETE_WORKOUT,
  FETCH_PUBLIC_WORKOUTS
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_WORKOUTS:
      return Object.assign({}, state, { workouts: action.payload });
    case SELECT_WORKOUT:
      return Object.assign({}, state, { clickedWorkout: action.payload });
    case DELETE_WORKOUT:
      return Object.assign({}, state, { clickedWorkout: action.payload.clickedWorkout, workouts: action.payload.workouts });
    case FETCH_PUBLIC_WORKOUTS:
      return Object.assign({}, state, { publicWorkouts: action.payload });
  }
  return state;
}