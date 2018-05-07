import React, { Component } from 'react';
import WorkoutsList from '../components/workoutsList.jsx'

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

export default WorkoutsListContainer;