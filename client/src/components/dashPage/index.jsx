import React, { Component } from 'react';
import Navbar from './navbar.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import * as colors from 'material-ui/styles/colors';

const tabStyle = {
  background: colors.grey300,
  color: "#5A6978",
  textTransform: "none"
};

const tabsStyle = {
  marginTop: "40px",
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
          <Navbar user={this.props.user} handleOnChangeText={this.props.handleOnChangeText} searchText={this.props.searchText}/>

          <div className="dashPageBody">
          </div>
        </div>
        <Tabs style={tabsStyle} inkBarStyle={{display: "none"}}>
          <Tab disableTouchRipple={true} className="tab" label="Schedule" style={tabStyle} >
            <div>
              <h2 >Tab One</h2>
              <p>
                This is an example tab.
              </p>
              <p>
                You can put any sort of HTML or react component in here. It even keeps the component state!
              </p>

            </div>
          </Tab>
          <Tab disableTouchRipple={true} className="tab" label="Workouts" style={tabStyle} >
            <div>
              <h2>Tab Two</h2>
              <p>
                This is another example tab.
              </p>
            </div>
          </Tab>
          <Tab disableTouchRipple={true} className="tab" label="Clients" style={tabStyle}>
            <div>
              <h2>Tab Three</h2>
              <p>
                This is a third example tab.
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default DashPage;