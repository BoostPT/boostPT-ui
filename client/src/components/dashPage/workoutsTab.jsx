import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateWorkoutContainer from '../../containers/CreateWorkoutContainer.jsx';

class WorkoutsTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.activeListItem === 0 ? (
      <h1>INSERT VIEW WORKOUTS COMPONENT</h1>
    ) : (
      <CreateWorkoutContainer user_id={this.props.user_id} />
    );
  }
}

WorkoutsTab.propTypes = {
  activeListItem: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired
};

export default WorkoutsTab;