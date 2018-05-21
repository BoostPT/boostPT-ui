import {
  CHANGE_USER_PICTURE
} from '../actions/types'

export default function(state = {}, action) {
  if(action.type === CHANGE_USER_PICTURE){
    return Object.assign({}, state, {
      user: action.payload 
    });
  }

  return state;
}