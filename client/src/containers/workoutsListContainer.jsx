import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getWorkoutsList,
  selectedWorkout
} from '../actions/index.js';
import WorkoutsList from '../components/workoutsView/workoutsList.jsx';
import WorkoutItem from '../components/workoutsView/workoutItem.jsx';
import WorkoutModalContainer from './workoutModalContainer.jsx';
import WorkoutItemContainer from './workoutItemContainer.jsx';


class WorkoutsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalVisible: false,
      workoutId: null,
      workoutName: null
    }
    this.handleWorkoutClick = this.handleWorkoutClick.bind(this);
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

  handleWorkoutClick(workout) { 
    this.props.selectedWorkout(workout);
  }
  
  toggleModal(e) {
    e.stopPropagation();
    this.setState({ 
      modalVisible: !this.state.modalVisible,
      workoutId: e.target.dataset.id || null,
      workoutName: e.target.dataset.name || null
    });
  }

  render() {
    return (
      <div>
        <WorkoutsList
         userId={this.props.userId}
         workouts={this.props.workouts} 
         getEachExerciseCount={this.getEachExerciseCount}
         handleWorkoutClick={this.handleWorkoutClick}
         toggleModal={this.toggleModal.bind(this)}
        />
        <WorkoutItemContainer clickedWorkout={this.props.clickedWorkout} />
        <WorkoutModalContainer
         modalVisible={this.state.modalVisible} 
         clickedWorkout={this.props.clickedWorkout}
         toggleModal={this.toggleModal.bind(this)}
         workouts={this.props.workouts}
         workoutId={this.state.workoutId}
         workoutName={this.state.workoutName}
        />
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