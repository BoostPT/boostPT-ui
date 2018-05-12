import React, { Component } from 'react';
import WorkoutsListItem from './workoutsListItem.jsx';
import Paper from 'material-ui/Paper';
import { blueGrey800 } from 'material-ui/styles/colors';

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
                    handleExerciseClick={this.props.handleExerciseClick}
                    handleDeleteClick={this.props.handleDeleteClick}
                   />
          })
          :
          null}
      </div>
    );
  }
}

export default WorkoutsList;