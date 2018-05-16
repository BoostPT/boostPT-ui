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
  
  sortExercises(exercises) {
    return exercises.sort((a, b) => a.order_index - b.order_index);
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

    updatedWorkouts = updatedWorkouts.map(workout => {
      if (workout.id === this.props.clickedWorkout.id) {
        return updatedWorkout;
      } else {
        return workout;
      }
    });
    this.props.updateWorkoutsWithStar(updatedWorkouts);

  }

  render() {
    return (
      <WorkoutItem
       user_id={this.props.user_id}
       clickedWorkout={this.props.clickedWorkout}
       sortExercises={this.sortExercises}
       handleStarWorkoutClick={this.handleStarWorkoutClick}
       star={!!this.props.clickedWorkout.star}
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
