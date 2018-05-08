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
      <Paper style={style} zDepth={5} children={<ExerciseItem />} />
    );
  }
}

export default WorkoutItem;