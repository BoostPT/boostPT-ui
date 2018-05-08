import React, { Component } from 'react';
import ExerciseItem from './exerciseItem.jsx';
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
    return (
        <Paper style={style} zDepth={5} children={
          <div className="font">
            <div className="hug-left">
              <h2 className="workout-title">
                My Workout #1
                <img className="float-right pad-right" src={require("../../../../client/dist/images/lock.png")}></img>
                <div className="clear-float"></div>
              </h2>
              <p>Date Created: May 5, 2018</p>
            </div>
            <ExerciseItem />
          </div>
        } />
    );
  }
}

export default WorkoutItem;