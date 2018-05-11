import React, { Component } from 'react';
import WorkoutItem from '../components/workoutsView/workoutItem.jsx';

class WorkoutItemContainer extends Component {
  constructor(props) {
    super(props);
  }
   
  render() {
    return (
      <WorkoutItem clickedWorkout={this.props.clickedWorkout}/>
    );
  }
}


export default WorkoutItemContainer;
