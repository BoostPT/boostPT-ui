import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkoutItem from '../components/workoutsView/workoutItem.jsx';
import axios from 'axios';
import {
  selectedWorkout,
  updateWorkoutsWithStar
} from '../actions/index.js';

// Change where we load this from later?
const REST_SERVER_URL='http://localhost:8000/api';

class WorkoutItemContainer extends Component {
  constructor(props) {
    super(props);
    this.handleStarWorkoutClick = this.handleStarWorkoutClick.bind(this);
  }

  handleStarWorkoutClick() {
    let updatedWorkout = Object.assign({}, this.props.clickedWorkout);
    let updatedWorkouts = this.props.workouts.slice();
    const payload = {
      user_id: this.props.user_id,
      workout_id: this.props.clickedWorkout.id
    };
    axios.post(REST_SERVER_URL.concat('/workouts/starworkout'), payload, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
    updatedWorkout.star = !updatedWorkout.star;
    this.props.selectedWorkout(updatedWorkout);

    for (let i = 0; i < updatedWorkouts.length; i++) {
      if (updatedWorkouts[i].id === this.props.clickedWorkout.id) {
        updatedWorkouts[i] = updatedWorkout;
        break;
      }
    }

    this.props.updateWorkoutsWithStar(updatedWorkouts);

  }

  render() {
    let star = false;
    if (this.props.clickedWorkout && this.props.clickedWorkout.star) {
      star = true;
    }
    return (
      <WorkoutItem
       user_id={this.props.user_id}
       clickedWorkout={this.props.clickedWorkout}
       handleStarWorkoutClick={this.handleStarWorkoutClick}
       star={star}
       />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clickedWorkout: state.workoutsReducer.clickedWorkout,
    workouts: state.workoutsReducer.workouts,
    user_id: state.auth.user.id
  }
};

export default connect(mapStateToProps, { selectedWorkout, updateWorkoutsWithStar })(WorkoutItemContainer);