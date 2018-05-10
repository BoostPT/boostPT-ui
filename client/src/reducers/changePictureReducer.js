import {
  CHANGE_USER_PICTURE
} from '../actions/types'

export default function(state = {}, action) {

  if(action.type === CHANGE_USER_PICTURE){
<<<<<<< e34832f06250ac928e9b1913234f66c1c54b2f66
=======
    console.log("made it inside reducer");
    console.log("action payload",action.payload);
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
    return Object.assign({}, state, {
      user: action.payload 
    });
  }

  return state;
}
