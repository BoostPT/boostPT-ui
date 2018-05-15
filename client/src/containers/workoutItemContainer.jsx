import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkoutItem from '../components/workoutsView/workoutItem.jsx';
import axios from 'axios';

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

  async handleStarWorkoutClick() {
    const payload = {
      user_id: this.props.user_id,
      workout_id: this.props.clickedWorkout.id
    };
    await axios.post(REST_SERVER_URL.concat('/workouts/starworkout'), payload, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
  }

  render() {
    return (
      <WorkoutItem
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
    user_id: state.auth.user.id
  }
};

export default connect(mapStateToProps, null)(WorkoutItemContainer);
