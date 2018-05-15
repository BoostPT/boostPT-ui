import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  deleteWorkout,
  getWorkoutsList
} from '../actions/index.js';
import WorkoutModal from '../components/workoutsView/workoutModal.jsx';

class WorkoutModalContainer extends Component {
  constructor(props) {
    super(props);
  }

  handleYesClick(e, workoutId, workouts) {
    this.props.deleteWorkout(workoutId, workouts);
    this.props.toggleModal(e);
  }

  render() {
    return(
      <div>
        <WorkoutModal 
         handleYesClick={this.handleYesClick.bind(this)}
         modalVisible={this.props.modalVisible}
         toggleModal={this.props.toggleModal}
         workouts={this.props.workouts}
         workoutId={this.props.workoutId}
        />
      </div>
    );
  };
}

export default connect(null, { deleteWorkout, getWorkoutsList })(WorkoutModalContainer);