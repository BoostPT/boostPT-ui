import { combineReducers } from 'redux';
import authReducer from './authReducer';
import workoutsReducer from './workoutsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  workoutsReducer
});

export default rootReducer;