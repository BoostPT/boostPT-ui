import React, { Component } from 'react';
import PublicWorkoutItem from '../../components/bioPage/workouts/publicWorkoutItem.jsx';

class PublicWorkoutItemContainer extends Component {
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
            <PublicWorkoutItem
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

export default PublicWorkoutItemContainer;