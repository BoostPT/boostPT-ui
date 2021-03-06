import { combineReducers } from 'redux';
import authReducer from './authReducer';
import workoutsReducer from './workoutsReducer';
import trainerReducer from './trainerReducer';
import clientReducer from './clientReducer';
import messagesReducer from './messagesReducer';
import eventsReducer from './eventsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  workoutsReducer,
  trainer: trainerReducer,
  client: clientReducer,
  channels: messagesReducer,
  events: eventsReducer
});

export default rootReducer;