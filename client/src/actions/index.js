import axios from 'axios';
import {
  LOGOUT_USER,
  AUTH_USER,
  CHANGE_USER_PICTURE,
  FETCH_WORKOUTS,
  SELECT_WORKOUT,
  TRAINER_CLIENT_LIST,
  DELETE_WORKOUT,
  FETCH_TRAINERS
} from './types';

export const authUser = (user) => {
  return {
    type: AUTH_USER,
    payload: user
  };
};

export const logOutUser = () => {
  // Move these 2 lines to the LogOut function on the component when it get's implemented.
  // document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  // this.props.history.push('/');
  return {
    type: LOGOUT_USER
  };
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

export const updateWorkoutsWithStar = (workouts) => {
  return {
    type: FETCH_WORKOUTS,
    payload: workouts
  }
}

export const getAllTrainersList = async () => {
  try {
    const trainers = await axios.get('http://localhost:8000/api/users/trainers');
    return {
      type: FETCH_TRAINERS,
      payload: trainers.data
    }
  } catch (err) {
    return (err);
  }
};