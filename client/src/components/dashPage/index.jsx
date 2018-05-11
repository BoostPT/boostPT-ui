import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Navbar from './navbar.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';

import WorkoutsTab from './workoutsTab.jsx';
import * as colors from "material-ui/styles/colors";

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
        <div className="dashPage">
          <Navbar userInfo={this.props.userInfo} handleOnChangeText={this.props.handleOnChangeText} searchText={this.props.searchText} handleUserNameClick={this.props.handleUserNameClick} handleTitleClick={this.props.handleTitleClick}/>

          <div className="dashPageBody">
            <Tabs className="tabs" inkBarStyle={{display: "none"}} initialSelectedIndex={1}>
              <Tab label="Schedule" style={tabStyle[tabStyles[0]]} onActive={this.props.handleTabSelect} disableTouchRipple={true}>
                <div>

                </div>
              </Tab>
              <Tab label="Workouts" style={tabStyle[tabStyles[1]]} onActive={this.props.handleTabSelect} disableTouchRipple={true}>
                <WorkoutsTab activeListItem={this.state.workoutTabActiveListItem} user_id={this.props.userInfo.id} />
              </Tab>
              <Tab label="Clients" style={tabStyle[tabStyles[2]]} onActive={this.props.handleTabSelect} disableTouchRipple={true}>
                <div>

                </div>
              </Tab>
            </Tabs>
            {this.renderWorkoutTabList()}
          </div>
        </div>
    )
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