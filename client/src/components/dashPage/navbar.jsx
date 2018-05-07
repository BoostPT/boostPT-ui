import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import * as colors from 'material-ui/styles/colors';

class Navbar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const toolbarStyle = {
      backgroundColor: colors.grey500
    };

    return(
      <Toolbar style={toolbarStyle} className="dashPageNavbar">
        <ToolbarGroup firstChild={true}>
          <div id="dashPageNavbarTitle">
            <span id="boostTitle" className="dashPageNavbarTitleText"> Boost </span>
            <span id="navbarTitlePT" className="dashPageNavbarTitleText"> PT </span>
          </div>
        </ToolbarGroup>
        <ToolbarGroup>

        </ToolbarGroup>

      </Toolbar>
    );
  }
}

export default Navbar;