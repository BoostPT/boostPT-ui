import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkoutItem from '../components/workoutsView/workoutItem.jsx';
import axios from 'axios';

// Change where we load this from later?
const REST_SERVER_URL='http://localhost:8000/api';

class WorkoutItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      star: false
    };
    this.handleStarWorkoutClick = this.handleStarWorkoutClick.bind(this);
  }
  
  sortExercises(exercises) {
    return exercises.sort((a, b) => a.order_index - b.order_index);
  }

  handleStarWorkoutClick() {
    const payload = {
      user_id: this.props.user_id,
      workout_id: this.props.clickedWorkout.id
    };
    axios.post(REST_SERVER_URL.concat('/workouts/starworkout'), payload, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
    this.setState({
      star: !this.state.star
    });
  }

  render() {
    return (
      <WorkoutItem
       clickedWorkout={this.props.clickedWorkout}
       sortExercises={this.sortExercises}
       handleStarWorkoutClick={this.handleStarWorkoutClick}
       star={this.state.star}
       />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.id
  }
};

export default connect(mapStateToProps, null)(WorkoutItemContainer);
