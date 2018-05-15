import { combineReducers } from 'redux';
import authReducer from './authReducer';
import workoutsReducer from './workoutsReducer';
import trainerReducer from './trainerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  workoutsReducer,
  trainer: trainerReducer
});

export default rootReducer;