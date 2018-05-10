import { combineReducers } from 'redux';
import authReducer from './authReducer';
import changePictureReducer from './changePictureReducer';
import workoutsReducer from './workoutsReducer';
import trainerReducer from './trainerReducer';
import changePictureReducer from './changePictureReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  workoutsReducer,
  trainer: trainerReducer,
  changePictureReducer
});

export default rootReducer;