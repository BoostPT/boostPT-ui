import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './navbar.jsx';
import ClientTabContainer from '../../containers/clientTabContainer.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';

import WorkoutsTab from './workoutsTab.jsx';

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

class DashPage extends Component {
  constructor(props){
    super(props);

    this.renderActiveTabPage = this.renderActiveTabPage.bind(this);
  }

  renderActiveTabPage() {
    if (this.props.activeTab === 0) {
      // Schedule Page
      return null
    } else if (this.props.activeTab === 1) {
      return <WorkoutsTab />
    } else if (this.props.activeTab === 2) {
      return <ClientTabContainer />
    }
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
              <Tab label="Schedule" style={tabStyle[tabStyles[0]]} onActive={this.props.handleTabSelect} disableTouchRipple={true} />
              <Tab label="Workouts" style={tabStyle[tabStyles[1]]} onActive={this.props.handleTabSelect} disableTouchRipple={true} />
              <Tab label="Clients" style={tabStyle[tabStyles[2]]} onActive={this.props.handleTabSelect} disableTouchRipple={true} />
            </Tabs>
            {this.renderActiveTabPage()}
          </div>
        </div>
    )
  }
}

DashPage.propTypes = {
  user: PropTypes.object.isRequired,
  handleTabSelect: PropTypes.func.isRequired,
  handleOnChangeText: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  handleUserNameClick: PropTypes.func.isRequired
};

export default DashPage;