import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';

import NavbarContainer from '../../containers/navbarContainer.jsx';
import ClientTabContainer from '../../containers/clientTabContainer.jsx';
import WorkoutsTab from './workoutsTab.jsx';
import MessagePageContainer from '../../containers/messagePageContainer.jsx';
import CalendarContainer from '../../containers/calendarContainer.jsx';
import StakeEtherContainer from '../../containers/StakeEtherContainer.jsx';

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

  renderTabs(nTabs, messagesTabIndex) {
    const tabStyles = Array(nTabs).fill('').map((v, i) => this.props.activeTab === i ? 'active' : 'standard');
    return (
      <Tabs className="tabs" inkBarStyle={{display: "none"}} initialSelectedIndex={1}>
        <Tab label="Schedule" style={tabStyle[tabStyles[0]]} onActive={this.props.handleTabSelect} disableTouchRipple={true} />
        <Tab label="Workouts" style={tabStyle[tabStyles[1]]} onActive={this.props.handleTabSelect} disableTouchRipple={true} />
        {this.props.user.istrainer ? (
          <Tab label="Clients" style={tabStyle[tabStyles[2]]} onActive={this.props.handleTabSelect} disableTouchRipple={true} />
          ) : (
            null
          )
        }
        <Tab label="Messages" style={tabStyle[tabStyles[messagesTabIndex]]} onActive={this.props.handleTabSelect} disableTouchRipple={true} />
        <Tab label="Incentives" style={tabStyle[tabStyles[messagesTabIndex + 1]]} onActive={this.props.handleTabSelect} disableTouchRipple={true} />
      </Tabs>
    )
  }

  renderActiveTabPage(messagesTabIndex) {
    if (this.props.activeTab === 0) {
      return <CalendarContainer/>
    } else if (this.props.activeTab === 1) {
      return <WorkoutsTab />
    } else if (this.props.user.istrainer && this.props.activeTab === 2) {
      return <ClientTabContainer history={this.props.history}/>
    } else if (this.props.activeTab === messagesTabIndex) {
      return <MessagePageContainer/>
    } else if (this.props.activeTab === messagesTabIndex + 1) {
      return <StakeEtherContainer />
    }
  }

  render() {
    const nTabs = this.props.user.istrainer ? 5 : 4;
    const messagesTabIndex = this.props.user.istrainer ? 3 : 2;
    return (
        <div className="dashPage">
          <NavbarContainer history={this.props.history}/>
          <div className="dashPageBody">
            {this.renderTabs(nTabs, messagesTabIndex)}
            {this.renderActiveTabPage(messagesTabIndex)}
          </div>
        </div>
    )
  }
}

DashPage.propTypes = {
  user: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  handleTabSelect: PropTypes.func.isRequired,
};

export default DashPage;