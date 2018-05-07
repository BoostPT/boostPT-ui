import axios from 'axios';
import {
  LOGOUT_USER,
  AUTH_USER
} from './types';

export const logOutUser = () => {
  // Delete cookie

  return { type: LOGOUT_USER };
}

export const loginUser = async (user) => {
  try {
    console.log(user);
    const result = await axios.post('http://localhost:8000/api/auth/login', user);
    console.log("inside loginuser action", result);
    return {
      type: AUTH_USER,
      payload: result.data
    };
  } catch (err) {
    return(err);
  }
}

export const signUpUser = async (user) => {
  try {
    await axios.post('http://localhost:8000/api/auth/signup', user);
    return {
      type: AUTH_USER,
      payload: { username: user.username, isTrainer: user.isTrainer }
    };
  } catch (err) {
    console.log(new Error(err));
  }
}
