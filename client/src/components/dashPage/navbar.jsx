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
          <div className="request-btn">
            {
              this.props.user.istrainer ?
                  <button onClick={this.props.handleRequestsClick}>Requests</button>
                :
                null
            }
            {
              this.props.showRequests ?
                !Array.isArray(this.props.requestsIn) ?
                  <p>No requests</p>
                  :
                  this.props.requestsIn.map(request => {
                    return <RequestListItem
                            picture={request.picture}
                            id={request.id}
                            username={request.username}
                            handleRequestOptionYesClick={this.props.handleRequestOptionYesClick}
                            handleRequestOptionNoClick={this.props.handleRequestOptionNoClick}
                          />
                  })
                  :
                  null
            }
          </div>
          <FontAwesomeIcon icon={faBell} />
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