import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Navbar from './navbar.jsx';
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
                <WorkoutsTab user_id={this.props.userInfo.id} />
              </Tab>
              <Tab label="Clients" style={tabStyle[tabStyles[2]]} onActive={this.props.handleTabSelect} disableTouchRipple={true}>
                <div>

                </div>
              </Tab>
            </Tabs>
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