import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getWorkoutsList,
  selectedWorkout
} from '../actions/index.js';
import WorkoutsList from '../components/workoutsView/workoutsList.jsx';
import WorkoutItem from '../components/workoutsView/workoutItem.jsx';
import WorkoutItemContainer from './workoutItemContainer.jsx';

class WorkoutsListContainer extends Component {
  constructor(props) {
    super(props);
    // this.state = { clicked: null } 
  }

  getEachExerciseCount(exercises) {
    return exercises.reduce((counts, exercise) => {
      counts[exercise.type] = counts[exercise.type] + 1 || 1;
      return counts;
    }, {});
  }

  handleExerciseClick() { 
    // 'this' refers to workoutListItem component
    this.props.selectedWorkout(this.state.workout);
  }
  
  render() {
    return (
      <div>
        <WorkoutsList 
         workouts={this.props.workouts} 
         getEachExerciseCount={this.getEachExerciseCount}
         handleExerciseClick={this.handleExerciseClick}
        //  clicked={this.state.clicked}
        />
        <WorkoutItemContainer clickedWorkout={this.props.clickedWorkout ? this.props.clickedWorkout : null} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clickedWorkout: state.workoutsReducer.clickedWorkout,
    workouts: state.workoutsReducer.workouts
  }
};

export default connect(mapStateToProps, { selectedWorkout })(WorkoutsListContainer);