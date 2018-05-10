import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/fontawesome-free-solid';
import Avatar from 'material-ui/Avatar';
import Dropzone from 'react-dropzone';

class BioPicture extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>

        {!this.props.picture ? 
          <Dropzone multiple accept="image/*" style={{borderStyle: "none"}} onDrop={this.props.handleOnDrop}>
            <Avatar className="bioPageAvatarPicture" size={100} icon={<FontAwesomeIcon icon={faUser}/>}/> 
          </Dropzone>
        :
          <Dropzone multiple accept="image/*" style={{borderStyle: "none"}} onDrop={this.props.handleOnDrop}>
<<<<<<< 3995b057a308e33aee8441d73b931556d6bbe43d
            <Avatar className="bioPageAvatarPicture" size={100} src={this.props.picture}/>
=======
            <Avatar className="avatarPicture" size={100} src={this.props.picture}/>
>>>>>>> picture changes on bioPage, but data does not persist when navigating back
          </Dropzone>
        }
        
      </div>
    );
  }
}

export default BioPicture;