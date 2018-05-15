import axios from 'axios';

import {
  LOGOUT_USER,
  AUTH_USER,
  CHANGE_USER_PICTURE,
  FETCH_WORKOUTS,
  FETCH_PUBLIC_WORKOUTS,
  SELECT_WORKOUT,
  TRAINER_CLIENT_LIST,
  DELETE_WORKOUT,
  FETCH_STARRED_EXERCISES,
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

export const changeUserPicture = async (payload) => {
  const picture = {
    filename: payload.file[0].name,
    fileType: payload.file[0].type
  };
  
  const options = {
    headers: {
      'Content-Type': payload.file[0].type,
    }
  };

  if(picture.filename.includes(' ')){
    picture.filename = picture.filename.split(' ').join('+');
  }

  const body = {
    pictureUrl: `http://s3-us-west-1.amazonaws.com/${process.env.S3_BUCKET}/${picture.filename}`,
    userId: payload.user.id
  };

  try{
    const signedUrl = await axios.post('http://localhost:8000/api/aws/s3',picture, {headers: { Authorization: `${document.cookie}`}});

    await axios.put(signedUrl.data, payload.file[0], options);

    const result = await axios.put(`http://localhost:8000/api/users/${payload.user.id}/picture`, body, {
      headers: {
        Authorization: `${document.cookie}`
      }});

    return {
      type: CHANGE_USER_PICTURE,
      payload: { 
        username: payload.user.username, 
        isTrainer: payload.user.istrainer, 
        id: payload.user.id, 
        picture: result.data.pictureUrl,
        email: payload.user.email
      }
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
};

export const getUserPublicWorkoutsList = async(userId) =>{
  try{
    const publicWorkouts = await axios.get(`http://localhost:8000/api/workouts/public/user/${userId}`, {headers: { Authorization: `${document.cookie}`}});
    //console.log("public workouts********",publicWorkouts);
    if(Array.isArray(publicWorkouts.data)){
      for(let publicWorkout of publicWorkouts.data){
        let exercises = await axios.get(`http://localhost:8000/api/workouts/exercises/${publicWorkout.id}`, {headers: { Authorization: `${document.cookie}`}});
        publicWorkout.exercises = exercises.data;
      }
      return{
        type: FETCH_PUBLIC_WORKOUTS,
        payload: publicWorkouts.data
      };
    }else{
      return{
        type: FETCH_PUBLIC_WORKOUTS,
        payload: []
      };
    }

  }catch(err){
    console.log("error*************",err);
    return (err);
  }
}

export const getStarredExercises = async (userId) => {
  const request = await axios.get(`http://localhost:8000/api/workouts/starredexercises/${userId}`, {
    headers: {
      Authorization: `${document.cookie}`
    }
  });

  return {
    type: FETCH_STARRED_EXERCISES,
    payload: request.data
  };
};

export const deleteFromStarredExercises = (exercises) => {
  return {
    type: FETCH_STARRED_EXERCISES,
    payload: exercises
  }
}

export const getAllTrainersList = async () => {
  try {
    const trainers = await axios.get('http://localhost:8000/api/users/trainers');
    return {
      type: FETCH_TRAINERS,
      payload: trainers
    }
  } catch (err) {
    return (err);
  }
};