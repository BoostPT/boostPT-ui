import axios from 'axios';
import {
  LOGOUT_USER,
  AUTH_USER,
  AUTH_ERROR,
  CHANGE_USER_PICTURE,
  FETCH_WORKOUTS,
  SELECT_WORKOUT,
  TRAINER_CLIENT_LIST,
  DELETE_WORKOUT
} from './types';
import { history } from '../index.jsx'

export const authUser = (user, endpoint) => {
  return async dispatch => {
    try {
      const result = await axios.post(`http://localhost:8000/api/auth/${endpoint}`, user);
      dispatch({
        type: AUTH_USER,
        payload: result.data
      });
      document.cookie = `jwt=${result.headers.jwt}`;
      history.push('/dash');
    }
    catch(err) {
      // Payload currently a hardcoded string
      // For sign up, it could be changed later to a more descriptive answer but not getting data with 409 HTTP response
      dispatch({
        type: AUTH_ERROR,
        payload: 'Invalid input'
      });
    }
  };
};

export const logOutUser = dispatch => {
  dispatch({ type: LOGOUT_USER });
  document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  history.push('/');
};

export const changeUserPicture = async (formData) => {
  
  try{
    await axios.post('https://api.cloudinary.com/v1_1/dxfzmbtst/image/upload', formData, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });

    return {
      type: CHANGE_USER_PICTURE,
      payload: {}
    };
  } catch (err) {
    return (err);
  }
};

export const getWorkoutsList = async (userId) => {
  try {
    const workouts = await axios.get(`http://localhost:8000/api/workouts/user/${userId}`, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
    for (let workout of workouts.data) {
      let exercises = await axios.get(`http://localhost:8000/api/workouts/exercises/${workout.id}`, {
        headers: {
          Authorization: `${document.cookie}`
        }
      });
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
    const result = await axios.get(`http://localhost:8000/api/users/${user.id}`, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
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

export const deleteWorkout = async (workoutId, workouts) => {
  try {
    await axios.delete(`http://localhost:8000/api/workouts/delete/${workoutId}`, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
    const newList = [];
    let i = 0;
    while (i < workouts.length - 1) {
      if (workouts[i].id !== workoutId) {
        newList.push(workouts[i]);
      }
      i++;
    }
    return { 
      type: DELETE_WORKOUT,
      payload: { clickedWorkout: null, workouts: newList }
    }
  } catch (err) {
    return (err);
  }
};