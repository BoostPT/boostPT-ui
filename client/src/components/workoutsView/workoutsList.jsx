import React, { Component } from 'react';
import WorkoutsListItem from './workoutsListItem.jsx';

class WorkoutsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="workout-list pos-abs outer-border">
        {Array.isArray(this.props.workouts) ? 
          this.props.workouts.map(workout => {
            return <WorkoutsListItem 
                    key={workout.id}
                    workout={workout} 
                    getEachExerciseCount={this.props.getEachExerciseCount}
                    handleWorkoutClick={this.props.handleWorkoutClick}
                    toggleModal={this.props.toggleModal}
                    isPublic={this.props.isPublic}
                    handleScheduleButtonOnClick={this.props.handleScheduleButtonOnClick}
                   />
          })
          :
          null}
      </div>
    );
  }
}

export default WorkoutsList;