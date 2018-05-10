import {
  CHANGE_USER_PICTURE
} from '../actions/types'

export default function(state = {}, action) {

  if(action.type === CHANGE_USER_PICTURE){
<<<<<<< b1fcd1df4aa7499c99cee35d1cefcaa201c5485b
<<<<<<< e402a4c076557d199a31a0f05ee3f57f798affe3
<<<<<<< e34832f06250ac928e9b1913234f66c1c54b2f66
=======
    console.log("made it inside reducer");
    console.log("action payload",action.payload);
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
>>>>>>> Working Updates of profile picture in bioPage and dashPage
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
