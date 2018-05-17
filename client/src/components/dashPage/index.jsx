import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Navbar from './navbar.jsx';
import ClientTabContainer from '../../containers/clientTabContainer.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';

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
      workoutTabActiveListItem: 0,
      workoutCreatedBar: false
    };
    this.handleWorkoutTabListItemSelect = this.handleWorkoutTabListItemSelect.bind(this);
    this.handleCreateWorkoutSuccess = this.handleCreateWorkoutSuccess.bind(this);
    this.handleWorkoutBarClose = this.handleWorkoutBarClose.bind(this);
  }

  handleWorkoutTabListItemSelect(e) {
    this.setState({
      workoutTabActiveListItem: parseInt(e.currentTarget.getAttribute('data'))
    });
  }

  handleCreateWorkoutSuccess() {
    this.setState({
      workoutCreatedBar: true
    });
  }

  handleWorkoutBarClose() {
    this.setState({
      workoutCreatedBar: false
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
          <Navbar 
           user={this.props.user}
           handleOnChangeText={this.props.handleOnChangeText}
           searchText={this.props.searchText}
           handleUserNameClick={this.props.handleUserNameClick}
           handleTitleClick={this.props.handleTitleClick}
           handleSearchBarClick={this.props.handleSearchBarClick}
           filteredTrainers={this.props.filteredTrainers}
           showDropdown={this.props.showDropdown}
           showDropdownClick={this.props.showDropdownClick}
          />

          <div className="dashPageBody">
            <Tabs className="tabs" inkBarStyle={{display: "none"}} initialSelectedIndex={1}>
              <Tab label="Schedule" style={tabStyle[tabStyles[0]]} onActive={this.props.handleTabSelect} disableTouchRipple={true}>
                <div>

                </div>
              </Tab>
              <Tab label="Workouts" style={tabStyle[tabStyles[1]]} onActive={this.props.handleTabSelect} disableTouchRipple={true}>
                <WorkoutsTab activeListItem={this.state.workoutTabActiveListItem}
                             handleCreateWorkoutSuccess={this.handleCreateWorkoutSuccess}
                />
              </Tab>
              <Tab label="Clients" style={tabStyle[tabStyles[2]]} onActive={this.props.handleTabSelect} disableTouchRipple={true}>
                <div>
                <ClientTabContainer/>
                </div>
              </Tab>
            </Tabs>
            {this.renderWorkoutTabList()}
            <Snackbar
              open={this.state.workoutCreatedBar}
              message="Workout saved!"
              autoHideDuration={2000}
              onRequestClose={this.handleWorkoutBarClose}
            />
          </div>
        </div>
    )
  }
}

DashPage.propTypes = {
  user: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  handleTabSelect: PropTypes.func.isRequired,
  handleOnChangeText: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  handleUserNameClick: PropTypes.func.isRequired
};

export default DashPage;