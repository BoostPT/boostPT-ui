import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';

class LandingPage extends Component {
  render() {
    const toolbarStyle = {
      backgroundColor: colors.grey900
    }

    const toolbarTitleStyle = {
      color: colors.yellow500
    }
    
    return (
      //this toolbar may need to 
      <Toolbar style={toolbarStyle} className="landingPageToolBar">
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle style={toolbarTitleStyle} text="BoostPT"/>
        </ToolbarGroup>

        <ToolbarGroup>
          <RaisedButton label="Login" />
          <Link to="/signup"><RaisedButton label="Signup" /></Link>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default LandingPage;