import { combineReducers } from 'redux';
import authReducer from './authReducer';
import workoutsReducer from './workoutsReducer';
import trainerReducer from './trainerReducer';
import clientReducer from './clientReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  workoutsReducer,
  client: clientReducer,
  trainer: trainerReducer,
});

export default rootReducer;