import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';
import WorkoutsListContainer from '../../containers/workoutsListContainer.jsx';

/****/
import WorkoutsListContainer from '../../containers/workoutsListContainer.jsx';
import WorkoutItemContainer from '../../containers/workoutItemContainer.jsx'; 
/****/


import WorkoutsListContainer from '../../containers/workoutsListContainer.jsx';

const toolbarStyle = {
  backgroundColor: colors.grey900
}

const toolbarTitleStyle = {
  color: colors.yellow500
}

class LandingPage extends Component {
  render() {
    return (
      //this toolbar may need to be a separate component
      <div>
      <Toolbar style={toolbarStyle} className="landingPageToolBar">
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle style={toolbarTitleStyle} text="BoostPT"/>
        </ToolbarGroup>

        <ToolbarGroup>
          <Link to="/signup"><RaisedButton label="Signup" /></Link>
          <Link to='/login'><RaisedButton label="Login" /></Link>
        </ToolbarGroup>
      </Toolbar>
      <WorkoutsListContainer />
      <WorkoutItemContainer />
      </div>
    )
  }
}

export default LandingPage;