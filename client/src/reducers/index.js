import { combineReducers } from 'redux';
import authReducer from './authReducer';
import changePictureReducer from './changePictureReducer';
import workoutsReducer from './workoutsReducer';
import trainerReducer from './trainerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  workoutsReducer,
  trainer: trainerReducer,
  changePictureReducer,
});

export default rootReducer;