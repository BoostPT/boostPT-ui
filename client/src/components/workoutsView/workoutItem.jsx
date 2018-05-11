import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExerciseItem from './exerciseItem.jsx';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import { grey200 } from 'material-ui/styles/colors';

const style = {
  height: 550,
  width: 300,
  marginLeft: 450,
  marginTop: 20,
  textAlign: 'center',
  display: 'inline-block',
  borderRadius: 7,
  backgroundColor: grey200
};

class WorkoutItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const clicked = this.props.clickedWorkout;
    return (
      clicked ?
        <Paper style={style} zDepth={5} children={
          <div className="font">
            <div className="hug-left">
              <h2 className="workout-title">
                {clicked.name}
                <img className="float-right pad-right" src={require(`../../../../client/dist/images/${clicked.is_public ? "earth" : "lock"}.png`)}></img>
                <div className="clear-float"></div>
              </h2>
              <p>{moment(clicked.created_at).fromNow()}</p>
            </div>
            {this.props.sortExercises(clicked.exercises).map(exercise => <ExerciseItem key={new Date().getTime() + exercise.name} exercise={exercise} />)}
          </div>
        } />
        :
        null
    );
  }
}

export default WorkoutItem;