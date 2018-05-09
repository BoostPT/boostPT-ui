import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkoutItem from '../components/workoutsView/workoutItem.jsx';

class WorkoutItemContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WorkoutItem />
    );
  }
}

export default WorkoutItemContainer;
// export default connect(null, null)(WorkoutItemContainer);