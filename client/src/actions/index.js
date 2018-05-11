import axios from 'axios';
import {
  LOGOUT_USER,
  AUTH_USER,
  CHANGE_USER_PICTURE,
  FETCH_WORKOUTS,
  SELECT_WORKOUT,
  TRAINER_CLIENT_LIST
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

export const changeUserPicture = async (formData) => {
  
  try{
    await axios.post('https://api.cloudinary.com/v1_1/dxfzmbtst/image/upload', formData, { header: {'X-Requested-With': 'XMLHttpRequest'}});

    return {
      type: CHANGE_USER_PICTURE,
      payload: {}
    };
  } catch (err) {
    return (err);
  }
}

export const getWorkoutsList = async (userId) => {
  try {
    const workouts = await axios.get(`http://localhost:8000/api/workouts/user/${userId}`);
    for (let workout of workouts.data) {
      let exercises = await axios.get(`http://localhost:8000/api/workouts/exercises/${workout.id}`);
      workout.exercises = exercises.data;
    }
    return {
      type: FETCH_WORKOUTS,
      payload: workouts.data
    };
  } catch (err) {
    return (err);
  }
}

export const trainerClientList = async (user, cb) => {
  try {
    const result = await axios.get('http://localhost:8000/api/users/1')
    //change this to query for current trainer
    return {
      type: TRAINER_CLIENT_LIST,
      payload: result.data
    };
  } catch (err) {
    return (err);
  }
}

export const selectedWorkout = (workout) => {
  return {
    type: SELECT_WORKOUT,
    payload: workout
  }
};
