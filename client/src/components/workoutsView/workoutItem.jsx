import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExerciseItem from './exerciseItem.jsx';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import { grey200 } from 'material-ui/styles/colors';

class WorkoutItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="workout-container">
        {this.props.clickedWorkout ?
          <div className="font">
            <div className="hug-left">
              <h2 className="workout-title">
                {this.props.clickedWorkout.name}
                <img className="float-right pad-right" src={require(`../../../../client/dist/images/${this.props.clickedWorkout.is_public ? "earth" : "lock"}.png`)}></img>
                <div className="clear-float"></div>
              </h2>
              <p>{moment(this.props.clickedWorkout.created_at).fromNow()}</p>
            </div>
            {this.props.clickedWorkout.exercises.map(exercise => <ExerciseItem key={exercise.id} exercise={exercise} />)}
          </div>
        :
        null}
      </div>
    );
  }
}

export default WorkoutItem;