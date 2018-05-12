import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/fontawesome-free-solid';
import RaisedButton from 'material-ui/RaisedButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Email from 'material-ui/svg-icons/communication/email';
import Phone from 'material-ui/svg-icons/communication/phone';
import IconButton from 'material-ui/IconButton';
import { grey800, blueGrey800 } from 'material-ui/styles/colors';

import MyPublicWorkoutsContainer from '../../containers/myPublicWorkoutsContainer.jsx';
import BioPicture from '../bioPage/bioPicture.jsx';
import Navbar from '../dashPage/navbar.jsx';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/fontawesome-free-solid';
import Edit from 'material-ui/svg-icons/image/edit';
import Email from 'material-ui/svg-icons/communication/email';
import Phone from 'material-ui/svg-icons/communication/phone';
import IconButton from 'material-ui/IconButton';
import { grey800 } from 'material-ui/styles/colors';

const email_phone_style = {
  marginRight: '10%',
  width: '30px',
  height: '30px'
};

const edit_button_style = {
  padding: '0px',
  marginBottom: '7px', 
  height: '15px', 
  width: '15px'
};

const edit_button_style2 = {
  padding: '0px',
  marginBottom: '15px', 
  height: '15px', 
  width: '15px'
};

const IconButtonStyle = {
  padding: '0px',
  marginBottom: '15px', 
  height: '15px', 
  width: '15px'
};

const email_phone_style = {
  marginRight: '10%',
  width: '30px',
  height: '30px'
};

const edit_button_style = {
  padding: '0px',
  marginBottom: '7px', 
  height: '15px', 
  width: '15px'
};

const edit_button_style2 = {
  padding: '0px',
  marginBottom: '15px', 
  height: '15px', 
  width: '15px'
};

const IconButtonStyle = {
  padding: '0px',
  marginBottom: '15px', 
  height: '15px', 
  width: '15px'
};

const bioPageButtons = {
  position: 'absolute',
  bottom: '0px',
  alignSelf: 'center'
}

class BioPage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="bioPage">
        <Navbar 
          userInfo={this.props.userInfo} 
          handleOnChangeText={this.props.handleOnChangeText} 
          searchText={this.props.searchText} 
          handleUserNameClick={this.props.handleUserNameClick} 
          handleTitleClick={this.props.handleTitleClick}
        />

        <div className="bioPageBody">
          <div className="bioInfo">
            <div className="bioUsername">
              {this.props.userInfo.username}
            </div>
            <div className="bioPicture">
              <BioPicture picture={!this.props.userInfo.picture ? null : this.props.userInfo.picture} handleOnDrop={this.props.handleOnDrop}/>
            </div>
            <div className="aboutMe">
            {this.props.loggedInAsUser.id === this.props.userInfo.id ?
            <IconButton 
              disableTouchRipple={true} 
              iconStyle={edit_button_style} 
              style={edit_button_style}
            >
              <Edit style={edit_button_style} />
            </IconButton>
              :
              null
            }
              About Me:
              <div className="aboutMeText">
                {!this.props.userInfo.aboutMe? null : this.props.userInfo.aboutMe }
              </div>
            </div>
            <div className="email">
              <Email  style={email_phone_style}/>
              {!this.props.userInfo.email ? 'Unavailable' : this.props.userInfo.email}
            </div>
            <div className="phoneNumber">
              {this.props.loggedInAsUser.id === this.props.userInfo.id ? 
              <IconButton 
                disableTouchRipple={true} 
                iconStyle={IconButtonStyle} 
                style={edit_button_style2}
              >  
                <Edit style={edit_button_style2}/>
              </IconButton>  
                :
                null
              }
              <Phone style={email_phone_style}/>
              {!this.props.userInfo.phoneNumber ? 'Unavailable' : this.props.userInfo.phoneNumber}
            </div>
            <RaisedButton label="Send Message" style={bioPageButtons} backgroundColor={blueGrey800} />
          </div>
          <div className="bioPageMyPublicWorkouts">
            <MyPublicWorkoutsContainer user={this.props.userInfo}/>
          </div>
        </div>


      </div>
    );
  }
}

export default BioPage;