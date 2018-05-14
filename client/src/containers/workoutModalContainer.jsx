import React, { Component } from 'react';
import WorkoutModal from '../components/workoutsView/workoutModal.jsx';

class WorkoutModalContainer extends Component {
  constructor(props) {
    super(props);
  }

  handleYesClick() {
    console.log('clicked yes!');
    // make delete request
  }

  render() {
    return(
      <div>
        <WorkoutModal 
         handleYesClick={this.handleYesClick}
         modalVisible={this.props.modalVisible}
         workoutName={this.props.workoutName}
         toggleModal={this.props.toggleModal}
        />
      </div>
    );
  };
}

export default WorkoutModalContainer;