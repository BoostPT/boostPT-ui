import React, { Component } from 'react';
import SearchItem from './searchItem.jsx';
// import RequestListContainer from '../../containers/requestListContainer.jsx';
import RequestListItem from './requestListItem.jsx';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import * as colors from 'material-ui/styles/colors';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/fontawesome-free-solid';
import Mail from 'material-ui/svg-icons/communication/mail-outline';

const toolbarStyle = {
  backgroundColor: '#969FAA'
};

const mailStyle = {
  marginLeft: 15,
  marginTop: 4,
  cursor: 'pointer'
};

class Navbar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Toolbar style={toolbarStyle} className="dashPageNavbar">
        <ToolbarGroup firstChild={true}>
          <div className="dashPageNavbarTitle" onClick={this.props.handleTitleClick}>
            <span id="boostTitleNav">Boost</span>
            <span id="boostTitlePTNav">PT</span>
          </div>
        </ToolbarGroup>
        <ToolbarGroup>
          <div className="dashPageNavbarSearch">
            <input className="searchbar" name="searchText" placeholder="Search..." onChange={this.props.handleOnChangeText} onClick={this.props.showDropdownClick}/>
            {
              this.props.showDropdown ?
                <div className="dropdown-content" onClick={this.props.handleSearchItemClick}>
                  {this.props.filteredTrainers.map(trainer => {
                    return <SearchItem 
                            key={trainer.id}
                            username={trainer.username}
                            id={trainer.id}
                            picture={trainer.picture} 
                           />
                    })}
                </div>
                :
                null
            }
          </div>
          <div className="dashPageNavRequest">
            {
              this.props.user.istrainer ?
                <Mail className="request-btn" onClick={this.props.handleRequestsClick} style={mailStyle} />
                :
                null
            }
            {
              this.props.showRequests ?
              !Array.isArray(this.props.requestsIn) ?
              <div className="dropdown-content no-requests">No requests</div>
              :
              <div className="dropdown-content">
                    {this.props.requestsIn.map(request => {
                      return <RequestListItem
                      key={request.id}
                      picture={request.picture}
                      id={request.id}
                      username={request.username}
                      handleRequestOptionYesClick={this.props.handleRequestOptionYesClick}
                      handleRequestOptionNoClick={this.props.handleRequestOptionNoClick}
                      />
                    })}
                  </div>
                  :
                  null
                }
          </div>
          <div className="navbarUser" onClick={this.props.handleUserNameClick}>
            {!this.props.user.picture ?
              <Avatar className="avatarPicture" size={30} icon={<FontAwesomeIcon icon={faUser}/>}/>
              : 
              <Avatar className="avatarPicture" size={30} src={this.props.user.picture}/>
            }
            <div className="navbarUsername">
              {this.props.user.username}
            </div>
          </div>
          <div className="log-out">
            <p onClick={this.props.handleLogOut}>Log Out</p>
          </div>
        </ToolbarGroup>

      </Toolbar>
    );
  }
}

export default Navbar;