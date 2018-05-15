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

  handleYesClick(e, workoutId, userId) {
    this.props.deleteWorkout(workoutId, userId);
    this.props.toggleModal(e);
  }

  render() {
    return(
      <div>
        <WorkoutModal 
         handleYesClick={this.handleYesClick.bind(this)}
         modalVisible={this.props.modalVisible}
         clickedWorkout={this.props.clickedWorkout}
         toggleModal={this.props.toggleModal}
         userId={this.props.userId}
        />
      </div>
    );
  };
}

export default connect(null, { deleteWorkout, getWorkoutsList })(WorkoutModalContainer);