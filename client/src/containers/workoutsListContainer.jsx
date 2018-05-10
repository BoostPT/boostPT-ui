import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWorkoutsList } from '../actions/index.js';
import WorkoutsList from '../components/workoutsView/workoutsList.jsx'

class WorkoutsListContainer extends Component {
  constructor(props) {
    super(props);
  }

  getEachExerciseCount(exercises) {
    return exercises.reduce((counts, exercise) => {
      counts[exercise.type] = counts[exercise.type] + 1 || 1;
      return counts;
    }, {});
  }
  
  render() {
    return (
      <WorkoutsList 
       workouts={this.props.workouts} 
       getEachExerciseCount={this.getEachExerciseCount} 
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workoutsReducer.workouts
  }
};

export default connect(mapStateToProps, null)(WorkoutsListContainer);