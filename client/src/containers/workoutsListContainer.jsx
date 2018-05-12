import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getWorkoutsList,
  selectedWorkout
} from '../actions/index.js';
import WorkoutsList from '../components/workoutsView/workoutsList.jsx';
import WorkoutItem from '../components/workoutsView/workoutItem.jsx';
import WorkoutModal from '../components/workoutsView/workoutModal.jsx';
import WorkoutItemContainer from './workoutItemContainer.jsx';


class WorkoutsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false }
  }

  componentDidMount() {
    this.props.getWorkoutsList(this.props.userId);
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
  
  handleDeleteClick(e) {
    e.stopPropagation();
    this.setState({ modalVisible: true });
  }

  render() {
    console.log(this.props.clickedWorkout);
    return (
      <div>
        <WorkoutsList
         userId={this.props.userId}
         workouts={this.props.workouts} 
         getEachExerciseCount={this.getEachExerciseCount}
         handleExerciseClick={this.handleExerciseClick}
         handleDeleteClick={this.handleDeleteClick.bind(this)}
        />
        <WorkoutItemContainer clickedWorkout={this.props.clickedWorkout ? this.props.clickedWorkout : null} />
        <WorkoutModal modalVisible={this.state.modalVisible} workoutName={this.props.clickedWorkout.name} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clickedWorkout: state.workoutsReducer.clickedWorkout,
    workouts: state.workoutsReducer.workouts,
    userId: state.auth.user.id
  }
};

export default connect(mapStateToProps, { selectedWorkout, getWorkoutsList })(WorkoutsListContainer);