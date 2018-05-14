import React, { Component } from 'react';
import WorkoutModal from '../components/workoutsView/workoutModal.jsx';

class WorkoutModalContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <WorkoutModal />
      </div>
    );
  };
}

export default WorkoutModalContainer;