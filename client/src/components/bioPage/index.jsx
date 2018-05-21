import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/fontawesome-free-solid';
import RaisedButton from 'material-ui/RaisedButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Email from 'material-ui/svg-icons/communication/email';
import Phone from 'material-ui/svg-icons/communication/phone';
import IconButton from 'material-ui/IconButton';
import { grey800, blueGrey800, yellowA200
} from 'material-ui/styles/colors';

import PublicWorkouts from './workouts/publicWorkOuts.jsx';
import BioPicture from '../bioPage/bioPicture.jsx';
import NavbarContainer from '../../containers/navbarContainer.jsx';

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

const sendMessageButton = {
  position: 'absolute',
  marginBottom: '35%',
  bottom: '0px',
  alignSelf: 'center'
}

const RequestAsTrainerButton = {
  position: 'absolute',
  marginBottom: '20%',
  bottom: '0px',
  alignSelf: 'center'
}

class BioPage extends Component{
  constructor(props){
    super(props);
  }

  checkAlreadyRequested() {
    const requests = this.props.requestsOut;
    if (Array.isArray(requests)) {
      for (let i = 0; i < requests.length; i++) {
        if (requests[i].trainer_id === this.props.user.id || this.props.user.id === this.props.loggedInUserId) {
          return true;
        }
        return false;
      }
    }
  }

  render(){
    return(
      <div className="bioPage">
        <NavbarContainer history={this.props.history} changedUser={this.props.user}/>
        <div className="bioPageBody">
          <div className="bioInfo">
            <div className="bioUsername">
              {this.props.user.username}
            </div>
            <div className="bioPicture">
              <BioPicture picture={!this.props.user.picture ? null : this.props.user.picture} handleOnDrop={this.props.handleOnDrop}/>
            </div>
            <div className="aboutMe">
            {this.props.loggedInAsUser.id === this.props.user.id ?
            <IconButton 
              iconStyle={edit_button_style} 
              style={edit_button_style}
              onClick={this.props.editAboutMe}
            >
              <Edit style={edit_button_style} />
            </IconButton>
              :
              null
            }
              About Me:
              <div className="aboutMeText">
                {!this.props.user.aboutMe? null : this.props.user.aboutMe }
              </div>
            </div>
            <div className="email">
              <Email  style={email_phone_style}/>
              {!this.props.user.email ? 'Unavailable' : this.props.user.email}
            </div>
            <div className="phoneNumber">
              {this.props.loggedInAsUser.id === this.props.user.id ? 
              <IconButton 
                iconStyle={IconButtonStyle} 
                style={edit_button_style2}
                onClick={this.props.editPhoneNumber}
              >  
                <Edit style={edit_button_style2}/>
              </IconButton>  
                :
                null
              }
              <Phone style={email_phone_style}/>
              {!this.props.user.phoneNumber ? 'Unavailable' : this.props.user.phoneNumber}
            </div>
            <RaisedButton label="Send Message" style={sendMessageButton} backgroundColor={blueGrey800} labelColor={yellowA200} />
            {
              this.checkAlreadyRequested() ?
                null
                :
                <button onClick={this.props.handleRequestClick} data-id={this.props.user.id} className="requestAsTrainerButton">Request as Trainer</button>
            }
          </div>
          <div className="bioPageMyPublicWorkouts">
            <PublicWorkouts user={this.props.user} publicWorkouts={this.props.user.publicWorkouts}/>
          </div>
        </div>
      </div>
    );
  }
}

export default BioPage;