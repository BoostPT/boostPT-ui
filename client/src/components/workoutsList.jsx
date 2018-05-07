import React, { Component } from 'react';
import WorkoutsListItem from './workoutsListItem.jsx';
import Paper from 'material-ui/Paper';

class WorkoutsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      height: 550,
      width: 325,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    
    return (
      <Paper style={style} zDepth={2} children={<WorkoutsListItem />} />
    );
  }
}

export default WorkoutsList;