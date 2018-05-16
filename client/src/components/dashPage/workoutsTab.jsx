import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import CreateWorkoutContainer from '../../containers/CreateWorkoutContainer.jsx';
import WorkoutListContainer from '../../containers/workoutsListContainer.jsx';
import WorkoutItemContainer from '../../containers/workoutItemContainer.jsx';

class WorkoutsTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.activeListItem === 0 ? (
      <Fragment>
        <WorkoutListContainer />
        <WorkoutItemContainer />
      </Fragment>
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