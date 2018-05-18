import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import CreateWorkoutContainer from '../../containers/CreateWorkoutContainer.jsx';
import WorkoutListContainer from '../../containers/workoutsListContainer.jsx';
import WorkoutItemContainer from '../../containers/workoutItemContainer.jsx';
import { getStarredExercises } from "../../actions";
import { List, ListItem } from 'material-ui/List';
import * as colors from "material-ui/styles/colors";

const workoutTabListStyle = {
  standard: {
    backgroundColor: colors.grey300
  },
  active: {
    backgroundColor: colors.grey600
  }
};

class WorkoutsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeListItem: 0
    };
    this.handleWorkoutTabListItemSelect = this.handleWorkoutTabListItemSelect.bind(this);
  }

  handleWorkoutTabListItemSelect(e) {
    const tabIndex = parseInt(e.currentTarget.getAttribute('data'));
    this.setState({
      activeListItem: tabIndex
    });
    if (tabIndex === 1) {
      this.props.getStarredExercises(this.props.user.id);
    }
  }

  renderWorkoutTabList() {
    const workoutTabItemStatus = Array(2).fill('').map((v, i) => this.state.activeListItem === i ? 'active' : 'standard');
    return (
      <div className="workouts-list-div">
        <List className="workouts-list-select">
          <ListItem primaryText="View Workouts" style={workoutTabListStyle[workoutTabItemStatus[0]]} onClick={this.handleWorkoutTabListItemSelect} data="0" disableTouchRipple={true}/>
          <ListItem primaryText="Create Workout" style={workoutTabListStyle[workoutTabItemStatus[1]]} onClick={this.handleWorkoutTabListItemSelect} data="1" disableTouchRipple={true}/>
        </List>
      </div>
    );
  }

  render() {
    return this.state.activeListItem === 0 ? (
      <Fragment>
        <WorkoutListContainer />
        <WorkoutItemContainer />
        {this.renderWorkoutTabList()}
      </Fragment>
    ) : (
      <Fragment>
        <CreateWorkoutContainer />
        {this.renderWorkoutTabList()}
      </Fragment>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { getStarredExercises })(WorkoutsTab);