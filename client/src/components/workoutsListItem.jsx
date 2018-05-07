import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

class WorkoutsListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h5>Workout Title</h5>
        <span>created at</span>
        <p>Exercises</p>
        <div>
          <p>1 Warm-up</p>
          <p>1 Cardio</p>
          <p>8 Strength</p>
          <p>3 Stretch</p>
        </div>
        <span>public</span>
      </div>
    );
  }
}

export default WorkoutsListItem;