import axios from 'axios';
import {
  LOGOUT_USER,
  AUTH_USER,
  CHANGE_USER_PICTURE
} from './types';

export const logOutUser = () => {
  // Delete cookie

  return { type: LOGOUT_USER };
}

export const loginUser = async (user) => {
  try {
    const result = await axios.post('http://localhost:8000/api/auth/login', user);
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
    return(err);
  }
}

<<<<<<< HEAD
export const changeUserPicture = async (formData) => {
  
  try{
    await axios.post('https://api.cloudinary.com/v1_1/dxfzmbtst/image/upload', formData, { header: {'X-Requested-With': 'XMLHttpRequest'}});

    return {
      type: CHANGE_USER_PICTURE,
      payload: {}
    };
  } catch (err) {
    return (err);
=======
export const getWorkoutsList = async (user) => {
  try {

  } catch (err) {
    return(err);
>>>>>>> Added styles to exerciseItem component and created exerciseDetails component
  }
}
