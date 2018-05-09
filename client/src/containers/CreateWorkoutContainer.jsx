import React, { Component } from 'react';
import CreateWorkout from '../components/CreateWorkout.jsx';

import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';

// Change where we load these from later?
const REST_SERVER_URL='http://localhost:8000/api';
const API_ENDPOINT='/workouts/addWorkout'

class CreateWorkoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutName: '',
      exerciseForms: [],
      isPublic: true
    };
    this.handleAddExerciseMenuClick = this.handleAddExerciseMenuClick.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleWorkoutNameInput = this.handleWorkoutNameInput.bind(this);
    this.handleMakePrivateCheck = this.handleMakePrivateCheck.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleAddExerciseMenuClick(e) {
    let exerciseForm = {
      type: e.target.innerText,
      name: '',
      description: ''
    };

    if (e.target.innerText === 'Strength') {
      exerciseForm['Reps'] = '';
      exerciseForm['Sets'] = '';
    } else if (e.target.innerText === 'Cardio') {
      exerciseForm['Distance'] = '';
      exerciseForm['Pace'] = '';
      exerciseForm['Goal Time'] = '';
    } else if (e.target.innerText === 'Stretch') {
      exerciseForm['Goal Time'] = '';
    }

    this.setState({ exerciseForms: [...this.state.exerciseForms, exerciseForm] });
  }

  handleFormInput(e) {
    const [index, key] = e.target.getAttribute('data').split(',');
    const formCopy = cloneDeep(this.state.exerciseForms);

    formCopy[index][key] = e.target.value;
    this.setState({
      exerciseForms: formCopy
    });
  }

  handleWorkoutNameInput(e) {
    this.setState({
      workoutName: e.target.value
    });
  }

  handleMakePrivateCheck() {
    this.setState({
      isPublic: !this.state.isPublic
    });
  }

  async handleFormSubmit() {
    const payload = {
      user_id: this.props.user_id,
      workoutName: this.state.workoutName,
      exerciseForms: this.state.exerciseForms,
      isPublic: this.state.isPublic
    };

    try {
      await axios.post(REST_SERVER_URL.concat(API_ENDPOINT), payload);
      console.log('Successfully saved workout');
    }
    catch(err) {
      console.log('Error submitting workout form', err);
    }
  }

  render() {
    return (
      <CreateWorkout
        user_id={this.props.user_id}
        workoutName={this.state.workoutName}
        exerciseForms={this.state.exerciseForms}
        handleAddExerciseMenuClick={this.handleAddExerciseMenuClick}
        handleWorkoutNameInput={this.handleWorkoutNameInput}
        handleFormInput={this.handleFormInput}
        handleMakePrivateCheck={this.handleMakePrivateCheck}
        handleFormSubmit={this.handleFormSubmit}
      />
    )
  }
}

export default CreateWorkoutContainer;