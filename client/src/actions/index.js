import axios from 'axios';

import {
  LOGOUT_USER,
  AUTH_USER
} from './types';

export const logOutUser = () => {
  // Delete cookie

  return { type: LOGOUT_USER };
}

export const setAuthUser = (user) =>{
  return {
    type: AUTH_USER,
    payload: user
  };
}