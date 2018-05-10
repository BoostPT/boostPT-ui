import {
  CHANGE_USER_PICTURE
} from '../actions/types'

export default function(state = {}, action) {
<<<<<<< 3995b057a308e33aee8441d73b931556d6bbe43d
  if(action.type === CHANGE_USER_PICTURE){
<<<<<<< 9671e1341e6d73652e8b03e2b79c6cb721324fb1
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
=======
>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======

  if(action.type === CHANGE_USER_PICTURE){
<<<<<<< f3fc5c1401a7d973d278ed8b766af6d385bf4cae
    console.log("made it inside reducer");
    console.log("action payload",action.payload);
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
>>>>>>> Working Updates of profile picture in bioPage and dashPage
    return Object.assign({}, state, {
      user: action.payload 
    });
  }

  return state;
}
