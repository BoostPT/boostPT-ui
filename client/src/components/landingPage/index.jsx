import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';

const toolbarStyle = {
  backgroundColor: colors.grey900
}

const toolbarTitleStyle = {
  color: colors.yellow500
}

import CreateWorkout from '../CreateWorkout.jsx';

class LandingPage extends Component {
  render() {
    
    return (
      <div>
      //this toolbar may need to be a separate component
      <Toolbar style={toolbarStyle} className="landingPageToolBar">
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle style={toolbarTitleStyle} text="BoostPT"/>
        </ToolbarGroup>

        <ToolbarGroup>
          <Link to="/signup"><RaisedButton label="Signup" /></Link>
          <Link to='/login'><RaisedButton label="Login" /></Link>
        </ToolbarGroup>
      </Toolbar>
      <CreateWorkout API_ENDPOINT='/workouts/addWorkout' />
      </div>

    )
  }
}

export default LandingPage;