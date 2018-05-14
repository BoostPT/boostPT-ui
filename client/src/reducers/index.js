import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import authReducer from './authReducer';
import workoutsReducer from './workoutsReducer';
import trainerReducer from './trainerReducer';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['error']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  workoutsReducer,
  trainer: trainerReducer
});

export default rootReducer;