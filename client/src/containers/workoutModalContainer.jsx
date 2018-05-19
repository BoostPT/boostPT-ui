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

  handleYesClick(e, workoutId, workouts, userId) {
    this.props.deleteWorkout(workoutId, workouts, userId);
    this.props.toggleModal(e,'deleteWorkout');
  }

  render() {
    return(
      <div>
        {console.log("inside workoutModal container",this.props)}
        <WorkoutModal 
         handleYesClick={this.handleYesClick.bind(this)}
         modalVisible={this.props.modalVisible}
         toggleModal={this.props.toggleModal}
         workouts={this.props.workouts}
         workoutId={this.props.workoutId}
         workoutName={this.props.workoutName}
         userId={this.props.userId}
        />
      </div>
    );
  };
}

export default connect(null, { deleteWorkout, getWorkoutsList })(WorkoutModalContainer);