import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavbarContainer from '../../containers/navbarContainer.jsx';
import ClientTabContainer from '../../containers/clientTabContainer.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import WorkoutsTab from './workoutsTab.jsx';
import MessagePageContainer from '../../containers/messagePageContainer.jsx';
import CalendarContainer from '../../containers/calendarContainer.jsx';

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
      return <CalendarContainer/>
    } else if (this.props.activeTab === 1) {
      return <WorkoutsTab />
    } else if (this.props.activeTab === 2) {
      return <ClientTabContainer />
    } else if (this.props.activeTab === 3) {
      return <MessagePageContainer/>
    }
  }

  render() {

    const tabStyles = Array(4).fill('').map((v, i) => this.props.activeTab === i ? 'active' : 'standard');

    return (
        <div className="dashPage">
          <NavbarContainer history={this.props.history}/>
          <div className="dashPageBody">
            <Tabs className="tabs" inkBarStyle={{display: "none"}} initialSelectedIndex={1}>
              <Tab label="Schedule" style={tabStyle[tabStyles[0]]} onActive={this.props.handleTabSelect} disableTouchRipple={true} />
              <Tab label="Workouts" style={tabStyle[tabStyles[1]]} onActive={this.props.handleTabSelect} disableTouchRipple={true} />
              <Tab label="Clients" style={tabStyle[tabStyles[2]]} onActive={this.props.handleTabSelect} disableTouchRipple={true} />
              <Tab label="Messages" style={tabStyle[tabStyles[3]]} onActive={this.props.handleTabSelect} disableTouchRipple={true} />
            </Tabs>
            {this.renderActiveTabPage()}
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