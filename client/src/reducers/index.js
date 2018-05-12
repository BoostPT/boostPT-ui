import { combineReducers } from 'redux';
import authReducer from './authReducer';
import workoutsReducer from './workoutsReducer';

const rootReducer = combineReducers({
  authReducer,
  workoutsReducer
});

export default rootReducer;