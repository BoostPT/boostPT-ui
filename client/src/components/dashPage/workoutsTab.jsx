import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateWorkoutContainer from '../../containers/CreateWorkoutContainer.jsx';
import WorkoutListContainer from '../../containers/workoutsListContainer.jsx';

class WorkoutsTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.activeListItem === 0 ? (
      <WorkoutListContainer />
    ) : (
      <CreateWorkoutContainer handleCreateWorkoutSuccess={this.props.handleCreateWorkoutSuccess} />
    );
  }
}

WorkoutsTab.propTypes = {
  activeListItem: PropTypes.number.isRequired,
  handleCreateWorkoutSuccess: PropTypes.func.isRequired
};

export default WorkoutsTab;