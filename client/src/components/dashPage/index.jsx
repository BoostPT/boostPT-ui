import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Navbar from './navbar.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';

import WorkoutsTab from './workoutsTab.jsx';
import * as colors from "material-ui/styles/colors";

import CreateWorkout from '../CreateWorkout.jsx';
import WorkoutListsContainer from '../../containers/workoutsListContainer.jsx';
// import WorkoutItemContainer from '../../containers/workoutItemContainer.jsx';
import CreateWorkoutContainer from '../../containers/CreateWorkoutContainer.jsx';

const tabStyle = {
  standard: {
    background: "#C3CAD3",
    color: "#5A6978",
    textTransform: "none"
  },
  active: {
    background: "#5A6978",
    color: "#FFEB3B",
    textTransform: "none"
  }
};

const workoutTabListStyle = {
  standard: {
    backgroundColor: colors.grey300
  },
  active: {
    backgroundColor: colors.grey600
  }
};

class DashPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      workoutTabActiveListItem: 0
    };
    this.handleWorkoutTabListItemSelect = this.handleWorkoutTabListItemSelect.bind(this);
  }

  handleWorkoutTabListItemSelect(e) {
    this.setState({
      workoutTabActiveListItem: parseInt(e.currentTarget.getAttribute('data'))
    });
  }

  renderWorkoutTabList() {
    const workoutTabItemStatus = Array(2).fill('').map((v, i) => this.state.workoutTabActiveListItem === i ? 'active' : 'standard');
    return this.props.activeTab === 1 ? (
      <div className="workouts-list-div">
        <List className="workouts-list-select">
          <ListItem primaryText="View Workouts" style={workoutTabListStyle[workoutTabItemStatus[0]]} onClick={this.handleWorkoutTabListItemSelect} data="0" disableTouchRipple={true}/>
          <ListItem primaryText="Create Workout" style={workoutTabListStyle[workoutTabItemStatus[1]]} onClick={this.handleWorkoutTabListItemSelect} data="1" disableTouchRipple={true}/>
        </List>
      </div>
    ) : (
      null
    );
  }

  render() {

    const tabStyles = Array(3).fill('').map((v, i) => this.props.activeTab === i ? 'active' : 'standard');

    return (
      <div>
        <Tabs style={tabsStyle} inkBarStyle={{display: "none"}}>
          <Tab style={tabStyle.defaultTab} disableTouchRipple={true} className="tab" label="Schedule" >
            <div>

            </div>
          </Tab>
          <Tab disableTouchRipple={true} className="tab" label="Workouts" style={tabStyle.defaultTab} onActive={this.props.handleWorkoutsTabClick}>
            <div>
              <WorkoutListsContainer />
            </div>
          </Tab>
          <Tab disableTouchRipple={true} className="tab" label="Clients" style={tabStyle.defaultTab} >
            <div>
              
            </div>
          </Tab>
        </Tabs>
        <CreateWorkout user_id={this.props.userInfo.id} REST_SERVER_URL='http://localhost:8000/api' API_ENDPOINT='/workouts/addWorkout' />
      </div>
    );
  }
}

DashPage.propTypes = {
  userInfo: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  handleTabSelect: PropTypes.func.isRequired,
  handleOnChangeText: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  handleUserNameClick: PropTypes.func.isRequired
};

export default DashPage;