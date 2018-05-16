import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExerciseItem from '../components/workoutsView/exerciseItem.jsx';
import {
  selectedWorkout,
  updateWorkoutsWithStar
} from '../actions/index.js';

import axios from "axios/index";

// Change where we load this from later?
const REST_SERVER_URL='http://localhost:8000/api';

class ExerciseItemContainer extends Component {

  constructor(props) {
    super(props);
    this.handleStarExerciseClick = this.handleStarExerciseClick.bind(this);
  }

  handleStarExerciseClick() {
    let updatedExercise = Object.assign({}, this.props.exercise);
    let updatedWorkout = Object.assign({}, this.props.clickedWorkout);
    let updatedWorkouts = this.props.workouts.slice();
    const payload = {
      user_id: this.props.user_id,
      exercise_id: this.props.exercise.id
    };
    axios.post(REST_SERVER_URL.concat('/workouts/starexercise'), payload, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });

    updatedExercise.star = !updatedExercise.star;

    for (let i = 0; i < updatedWorkout.exercises.length; i++) {
      if (updatedWorkout.exercises[i].id === this.props.exercise.id) {
        updatedWorkout.exercises[i] = updatedExercise;
        break;
      }
    }

    this.props.selectedWorkout(updatedWorkout);

    // Update the workout list. O(n^2) now until we can refactor redux state
    for (let i = 0; i < updatedWorkouts.length; i++) {
      for (let j = 0; j < updatedWorkouts[i].exercises.length; j++) {
        if (updatedWorkouts[i].exercises[j] === this.props.exercise.id) {
          updatedWorkouts[i].exercises[j] = updatedExercise;
        }
      }
    }

    this.props.updateWorkoutsWithStar(updatedWorkouts);
  }

  render() {
    return (
      <ExerciseItem exercise={this.props.exercise} handleStarExerciseClick={this.handleStarExerciseClick} />
    )
  }

}

ExerciseItemContainer.propTypes = {
  exercise: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    clickedWorkout: state.workoutsReducer.clickedWorkout,
    workouts: state.workoutsReducer.workouts,
    user_id: state.auth.user.id
  }
};

export default connect(mapStateToProps, { selectedWorkout, updateWorkoutsWithStar })(ExerciseItemContainer);