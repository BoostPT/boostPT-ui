import React, { Component } from 'react';
import Navbar from './navbar.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';

const tabStyle = {
  defaultTab: {
    background: "#C3CAD3",
    color: "#5A6978",
    textTransform: "none"
  },
  activeTab: {
    background: "#5A6978",
    color: "#FFEB3B",
    textTransform: "none"
  }
};

const tabsStyle = {
  marginTop: "40px",
  marginLeft: "40px",
  width: "400px"
};

class DashPage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <div className="dashPage">
          <Navbar userInfo={this.props.userInfo} handleOnChangeText={this.props.handleOnChangeText} searchText={this.props.searchText} handleUserNameClick={this.props.handleUserNameClick} handleTitleClick={this.props.handleTitleClick}/>

          <div className="dashPageBody">
          </div>
        </div>
        <Tabs style={tabsStyle} inkBarStyle={{display: "none"}}>
          <Tab style={tabStyle.defaultTab} disableTouchRipple={true} className="tab" label="Schedule" >
            <div>

            </div>
          </Tab>
          <Tab disableTouchRipple={true} className="tab" label="Workouts" style={tabStyle.defaultTab}  >
            <div>
              
            </div>
          </Tab>
          <Tab disableTouchRipple={true} className="tab" label="Clients" style={tabStyle.defaultTab} >
            <div>
              
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default DashPage;