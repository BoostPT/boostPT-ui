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
  FETCH_TRAINERS,
  USER_CHANNEL_LIST,
  SCHEDULE_EVENT,
  FETCH_EVENTS,
  FETCH_REQUESTS_OUT,
  FETCH_REQUESTS_IN,
  DELETE_REQUEST,
  ADD_CONNECTION
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
    fileType: payload.file[0].type,
    
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
        istrainer: payload.user.istrainer, 
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

    if (Array.isArray(workouts.data)) {
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
    } else {
      return {
        type: FETCH_WORKOUTS,
        payload: []
      }
    }
  } catch (err) {
    return (err);
  }
};

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
};

export const selectedWorkout = (workout) => {
  return {
    type: SELECT_WORKOUT,
    payload: workout
  }
};

export const deleteWorkout = async (workoutId, workouts, userId) => {
  try {
    await axios.delete(`http://localhost:8000/api/workouts/delete/${userId}/${workoutId}`, {headers: {Authorization: `${document.cookie}`}});

    const newList = [];
    let i = 0;
    while (i < workouts.length) {
      if (workouts[i].id !== workoutId) {
        newList.push(workouts[i]);
      }
      i++;
    }
    return { 
      type: DELETE_WORKOUT,
      payload: { clickedWorkout: null, workouts: newList}
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
    return (err);
  }
};

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
};

export const getAllTrainersList = async () => {
  try {
    const trainers = await axios.get('http://localhost:8000/api/users/trainers', {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
    return {
      type: FETCH_TRAINERS,
      payload: trainers.data
    }
  } catch (err) {
    return (err);
  }
};

export const channelList = async (username) => {
  try {
    const result = await axios.get(`http://localhost:8000/api/messages/getchannels/${username}`, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
    return {
      type: USER_CHANNEL_LIST,
      payload: result.data
    };
  } catch (err) {
    return (err);
  }
};

export const fetchTrainerRequestsIn = async (trainerId) => {
  try {
    const requestsIn = await axios.get(`http://localhost:8000/api/users/request-in/${trainerId}`, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
    return {
      type: FETCH_REQUESTS_IN,
      payload: requestsIn.data
    }
  } catch (err) {
    return err;
  }
};  

export const scheduleEvent = async (type, payload) => {
  try {
    if(type === 'workout') {
      const result = await axios.post('http://localhost:8000/api/events/workout', payload,{ headers: { Authorization: `${document.cookie}`}});
    } else if(type === 'client') {
      const result = await axios.post('http://localhost:8000/api/events/client', payload, { headers: { Authorization: `${document.cookie}`}});
    } // Scheduling a client for an in-person 1 on 1 session
    return {
      type: SCHEDULE_EVENT,
      payload: {}
    }
  } catch(err) {
    return (err);
  }
}

export const fetchEvents = async (userId) => {
  try {
    const result = await axios.get(`http://localhost:8000/api/events/${userId}`,{ headers: { Authorization: `${document.cookie}`}});
    return {
      type: FETCH_EVENTS,
      payload: result.data
    };
  } catch (err) {
    return (err);
  }
};

export const fetchTrainerRequestsOut = async (clientId) => {
  try {
    const requestsOut = await axios.get(`http://localhost:8000/api/users/request-out/${clientId}`, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
    return {
      type: FETCH_REQUESTS_OUT,
      payload: requestsOut.data
    }
  } catch (err) {
    return err;
  }
};

export const deleteTrainerRequest = async (clientId, trainerId, requestsIn) => {
  try {
    await axios.delete(`http://localhost:8000/api/users/request-delete/${clientId}/${trainerId}`, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
    const newRequestsIn = [];
    let i = 0;
    while (i < requestsIn.length) {
      if (requestsIn[i].id !== parseInt(clientId)) {
        newRequestsIn.push(requestsIn[i]);
      }
      i++;
    }
    return {
      type: DELETE_REQUEST,
      payload: newRequestsIn
    }
  } catch (err) {
    return err;
  }
};  

export const addTrainerClientConnection = async (clientId, trainerId, clients) => {
  try {
    await axios.post('http://localhost:8000/api/users/add-connection', {
      client_id: clientId,
      trainer_id: trainerId
    },
    {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
    const addedClient = await axios.get(`http://localhost:8000/api/users/fetch-client/${clientId}`, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
    if (Array.isArray(clients)) {
      clients.push(addedClient.data[0]);
    } else {
      clients = [];
      clients.push(addedClient.data[0]);
    }
    return {
      type: ADD_CONNECTION,
      payload: clients
    }
  } catch (err) {
    return err;
  }
};
