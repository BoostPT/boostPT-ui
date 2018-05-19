import {
  USER_CHANNEL_LIST,
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case USER_CHANNEL_LIST:
      return Object.assign({}, state, {
        channelList: action.payload
      });
    break;
  }
  return state;
}
  