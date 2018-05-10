import { combineReducers } from 'redux';
import authReducer from './authReducer';
import workoutsReducer from './workoutsReducer';
import trainerClientReducer from './trainerClientReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  workoutsReducer,
  trainerClientReducer
});

export default rootReducer;