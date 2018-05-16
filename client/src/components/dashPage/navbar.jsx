import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import * as colors from 'material-ui/styles/colors';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/fontawesome-free-solid';

const toolbarStyle = {
  backgroundColor: colors.grey500
};

class Navbar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Toolbar style={toolbarStyle} className="dashPageNavbar">
        <ToolbarGroup firstChild={true}>
          <div id="dashPageNavbarTitle" onClick={this.props.handleTitleClick}>
            <span id="boostTitle" className="dashPageNavbarTitleText"> Boost </span>
            <span id="navbarTitlePT" className="dashPageNavbarTitleText"> PT </span>
          </div>
        </ToolbarGroup>
        <ToolbarGroup>
          <input className="dashPageNavbarSearch" placeholder="Search..." onChange={this.props.handleOnChangeText} />
          <FontAwesomeIcon icon={faBell} />
          <div className="navbarUser" onClick={this.props.handleUserNameClick}>
            {!this.props.user.picture ?
              <Avatar className="avatarPicture" size={30} icon={<FontAwesomeIcon icon={faUser}/>}/>
              : 
              <Avatar className="avatarPicture" size={30} src=""/>
            }
            <div className="navbarUsername">
              {this.props.user.username}
            </div>
          </div>
        </ToolbarGroup>

      </Toolbar>
    );
  }
}

export default Navbar;