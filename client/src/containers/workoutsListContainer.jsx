import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWorkoutsList } from '../actions/index.js';
import WorkoutsList from '../components/workoutsView/workoutsList.jsx'

class WorkoutsListContainer extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <WorkoutsList />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts
  }
};

export default connect(mapStateToProps, null)(WorkoutsListContainer);