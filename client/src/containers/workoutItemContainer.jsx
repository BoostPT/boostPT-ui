import React, { Component } from 'react';
import WorkoutItem from '../components/workoutsView/workoutItem.jsx';

class WorkoutItemContainer extends Component {
  constructor(props) {
    super(props);
  }
  
  sortExercises(exercises) {
    return exercises.sort((a, b) => a.order_index - b.order_index);
  }

  render() {
    return (
      <div>
        {
          this.props.clickedWorkout ? 
            <WorkoutItem
            clickedWorkout={this.props.clickedWorkout}
            sortExercises={this.sortExercises}
            />
            :
            null
        }
      </div>
    );
  }
}


export default WorkoutItemContainer;
