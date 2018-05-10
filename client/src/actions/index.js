import axios from 'axios';
// import env from 'dotenv';
require('dotenv').config();

import {
  LOGOUT_USER,
  AUTH_USER,
  CHANGE_USER_PICTURE,
  FETCH_WORKOUTS,
  SELECT_WORKOUT,
  TRAINER_CLIENT_LIST,
  DELETE_WORKOUT
} from './types';


export const authUser = (user) => {
  return {
    type: AUTH_USER,
    payload: user
  };
};

export const logOutUser = () => {
  // Delete cookie

  return { type: LOGOUT_USER };
}

export const loginUser = async (user) => {
  try {
<<<<<<< a9cb18656b334628b257dc1a33e1c9ac3b584113
    const result = await axios.post('http://localhost:8000/api/auth/login', user);
<<<<<<< f967b6977f453461b41ac565b1a3dc154dfe1208
<<<<<<< 5a970b4ec5e4158d0146128a4964b2840bd8993a
<<<<<<< 226924e49c15b6f17ed983205aa2f224a4f95881
<<<<<<< e402a4c076557d199a31a0f05ee3f57f798affe3
=======

>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======
    console.log("login action",result);
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
<<<<<<< 8970b96d32f9e79768783abb1d368da3ebb87a5d
=======

>>>>>>> Working Updates of profile picture in bioPage and dashPage
>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======
    const result = await axios.post('http://localhost:8000/api/auth/login', 
    user);
>>>>>>> Working BioPage ui after rebase
    return {
      type: AUTH_USER,
      payload: result.data
    };
  } catch (err) {
    return(err);
  }
}


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
      'Content-Type': payload.file[0].type
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
    const signedUrl = await axios.post('http://localhost:8000/api/aws/s3',picture);

    await axios.put(signedUrl.data, payload.file[0], options);

    const result = await axios.put(`http://localhost:8000/api/users/${payload.user.id}/picture`, body);

<<<<<<< ab47a668d03699c482ebd270661bac20822ae4a9
=======
export const loginUser = async (user) => {
  try {
<<<<<<< 1b157371cadf51c37884a477e2440b4aa3006bb4
    const result = await axios.post('http://localhost:8000/api/auth/login', user);
<<<<<<< 54a4529ed7f9ad27a7561825d7731b80d9db9182
<<<<<<< 418cdda1a469bf1410ef5845af5e0fb2da3659d0
<<<<<<< 665e30bc5705319f9948ea51e0ef06cbe8d87de1
<<<<<<< 2f4813c99cc686be5511793421bbc4fc742701ef
<<<<<<< 4c566fa69cd120358742c9411f15274b2d2026d2
<<<<<<< eb00eedcdf8716f5cbeafcf1767a2e168cd7e8a7
<<<<<<< 1f3dd22ed381012868583762664ef7aa2b872aec
<<<<<<< b9a2f00e22f36dbe5f85cce5c85bbd228012e4bf
<<<<<<< 38ce212cd9aba5209265dc29e53c0b67e37c796c
<<<<<<< 2cc89d75b90876992a360c6c8f93f80cd725f6b6
    console.log("login action",result);
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
=======
    console.log("login action",result);
=======

>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
<<<<<<< 8970b96d32f9e79768783abb1d368da3ebb87a5d
=======

>>>>>>> Working Updates of profile picture in bioPage and dashPage
>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======
    const result = await axios.post('http://localhost:8000/api/auth/login', 
    user);
>>>>>>> Working BioPage ui after rebase
=======
    console.log("login action",result);
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======

>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
    return {
      type: AUTH_USER,
      payload: result.data
    };
  } catch (err) {
    return(err);
  }
}
>>>>>>> picture changes on bioPage, but data does not persist when navigating back

<<<<<<< ed7088f2ba3101d9be75fe1fb49a39c9f4696d24
>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======
    console.log("login action",result);
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======

<<<<<<< 9df407eb6b54f47a0834794b6b1762ba6fcb56cb
>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======
=======
>>>>>>> Trying to add environment variables globally for client ui side
export const changeUserPicture = async (payload) => {
  const picture = {
    filename: payload.file[0].name,
    fileType: payload.file[0].type
  };
  
  const options = {
    headers: {
      'Content-Type': payload.file[0].type
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
    const signedUrl = await axios.post('http://localhost:8000/api/aws/s3',picture);
<<<<<<< 665e30bc5705319f9948ea51e0ef06cbe8d87de1
<<<<<<< 9df407eb6b54f47a0834794b6b1762ba6fcb56cb

    await axios.put(signedUrl.data, payload.file[0], options);

<<<<<<< 1f3dd22ed381012868583762664ef7aa2b872aec
    //post to the database the link url and change the picture link in the url
>>>>>>> Trying to add environment variables globally for client ui side
=======
    const result = await axios.put(`http://localhost:8000/api/users/${payload.user.id}/picture`, body);

<<<<<<< 4c566fa69cd120358742c9411f15274b2d2026d2
<<<<<<< d1762d2fbdf80b6ac5665b4da7771f22ed8daf7b
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
    //post to the database the link url and change the picture link in the url
>>>>>>> Trying to add environment variables globally for client ui side
=======
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
=======

>>>>>>> picture changes on bioPage, but data does not persist when navigating back
    await axios.put(signedUrl.data, payload.file[0], options);

    const result = await axios.put(`http://localhost:8000/api/users/${payload.user.id}/picture`, body);

<<<<<<< dfb106b59126f6508bc66ccb72cdbd798f0c5997
<<<<<<< 54a4529ed7f9ad27a7561825d7731b80d9db9182
<<<<<<< 68bacaf248c1d84cc167f85e8211d63197aa0b96
>>>>>>> Trying to add environment variables globally for client ui side
=======
    //post to the database the link url and change the picture link in the url
>>>>>>> Trying to add environment variables globally for client ui side
=======
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
    //post to the database the link url and change the picture link in the url
>>>>>>> Trying to add environment variables globally for client ui side
    return {
      type: CHANGE_USER_PICTURE,
<<<<<<< fd3b265431cd1a106e20cbe5d9b055778c3c6b61
<<<<<<< 287f55cc081dac75af156b387b1752b9110f6e7b
<<<<<<< ea50768157c4d2599431bc7f4bd8baa154708129
<<<<<<< 47fe189abb48275cdc40bf04e067fee5fef4c3ae
      payload: { username: payload.user.username, isTrainer: payload.user.istrainer, id: payload.user.id, picture: result.data.pictureUrl}
=======
      payload: { username: payload.user.username, isTrainer: payload.user.isTrainer, id: payload.user.id, picture: result.data.pictureUrl}
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
      payload: { username: payload.user.username, isTrainer: payload.user.istrainer, id: payload.user.id, picture: result.data.pictureUrl}
>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======
=======
<<<<<<< 418cdda1a469bf1410ef5845af5e0fb2da3659d0
>>>>>>> Working Updates of profile picture in bioPage and dashPage
<<<<<<< 665e30bc5705319f9948ea51e0ef06cbe8d87de1
      payload: { username: payload.user.username, isTrainer: payload.user.istrainer, id: payload.user.id, picture: result.data.pictureUrl}
=======
      payload: { username: payload.user.username, isTrainer: payload.user.isTrainer, id: payload.user.id, picture: result.data.pictureUrl}
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
<<<<<<< fd3b265431cd1a106e20cbe5d9b055778c3c6b61
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
=======
      payload: { username: payload.user.username, isTrainer: payload.user.istrainer, id: payload.user.id, picture: result.data.pictureUrl}
>>>>>>> Working Updates of profile picture in bioPage and dashPage
>>>>>>> Working Updates of profile picture in bioPage and dashPage
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

<<<<<<< 51501bf27469f84e88042a951895169054bedc7e
<<<<<<< 674f51ba5f7fb73c32d33f6cfdd57b5f036eff37
export const trainerClientList = async (user, cb) => {
  try {
    const result = await axios.get(`http://localhost:8000/api/users/${user.id}`, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
=======
=======
>>>>>>> Trying to add environment variables globally for client ui side
export const changeUserPicture = async (payload) => {
  const picture = {
    filename: payload.file[0].name,
    fileType: payload.file[0].type
  };
  
  const options = {
    headers: {
      'Content-Type': payload.file[0].type
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
    const signedUrl = await axios.post('http://localhost:8000/api/aws/s3',picture);
<<<<<<< 38ce212cd9aba5209265dc29e53c0b67e37c796c
<<<<<<< 51501bf27469f84e88042a951895169054bedc7e

    await axios.put(signedUrl.data, payload.file[0], options);

<<<<<<< ab47a668d03699c482ebd270661bac20822ae4a9
    //post to the database the link url and change the picture link in the url
>>>>>>> Trying to add environment variables globally for client ui side
    return {
      type: TRAINER_CLIENT_LIST,
      payload: result.data
=======
    const result = await axios.put(`http://localhost:8000/api/users/${payload.user.id}/picture`, body);
=======
    await axios.put(signedUrl.data, payload.file[0], options);
    await axios.put(`http://localhost:8000/api/users/${payload.user.id}/picture`, body);
>>>>>>> Trying to add environment variables globally for client ui side
=======

    await axios.put(signedUrl.data, payload.file[0], options);
>>>>>>> picture changes on bioPage, but data does not persist when navigating back

    const result = await axios.put(`http://localhost:8000/api/users/${payload.user.id}/picture`, body);

    return {
      type: CHANGE_USER_PICTURE,
<<<<<<< b9a2f00e22f36dbe5f85cce5c85bbd228012e4bf
<<<<<<< 38ce212cd9aba5209265dc29e53c0b67e37c796c
<<<<<<< 2cc89d75b90876992a360c6c8f93f80cd725f6b6
      payload: { username: payload.user.username, isTrainer: payload.user.isTrainer, id: payload.user.id, picture: result.data.pictureUrl}
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
      payload: { username: payload.user.username, isTrainer: payload.user.istrainer, id: payload.user.id, picture: result.data.pictureUrl}
>>>>>>> Working Updates of profile picture in bioPage and dashPage
=======
      payload: { username: payload.user.username, isTrainer: payload.user.isTrainer, id: payload.user.id, picture: result.data.pictureUrl}
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
=======
      payload: { username: payload.user.username, isTrainer: payload.user.istrainer, id: payload.user.id, picture: result.data.pictureUrl}
>>>>>>> Working Updates of profile picture in bioPage and dashPage
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