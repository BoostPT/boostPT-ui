import React, { Component } from 'react';
import WorkoutsListItem from './workoutsListItem.jsx';
import Paper from 'material-ui/Paper';
import { blueGrey800 } from 'material-ui/styles/colors';

const style = {
  height: 550,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: blueGrey800,
  borderRadius: 7
};

class WorkoutsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper 
      className="pos-abs outer-border"
      style={style}
      zDepth={1}
      children={
        Array.isArray(this.props.workouts) ? 
          this.props.workouts.map(workout => {
            return <WorkoutsListItem 
                    key={workout.id}
                    workout={workout} 
                    getEachExerciseCount={this.props.getEachExerciseCount}
                   />
          })
          :
          null
      }
      />
    );
  }
}

export default WorkoutsList;