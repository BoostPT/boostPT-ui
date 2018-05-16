import React, { Component } from 'react';
import { connect } from 'react-redux';
import BioPage from '../../components/bioPage/index.jsx';
import { changeUserPicture, selectedWorkout } from '../../actions/index.js';

class BioPageContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchText: '',
      bioPageUserInfo: this.props.location.state,
      aboutMeEdit: false,
      phoneNumberEdit: false
    }
  }
  handleOnChangeText(e){
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  handleUserNameClick(){
    this.props.history.push(`/bio/${this.props.user.id}`);
  }

  handleTitleClick(){
    this.props.selectedWorkout({});
    this.props.history.push({pathname: '/dash', state: this.state.bioPageUserInfo});
  }

  editAboutMe(){
    this.setState({aboutMeEdit: true});
  }

  editPhoneNumber(){
    this.setState({phoneNumberEdit: true});
  }
  async handleOnDrop(files){
    const payload = {
      file: files,
      user: this.props.user
    }
    try {
      const changed = await this.props.changeUserPicture(payload);
      await this.setState({
        bioPageUserInfo: this.props.changedUserInfo
      });
    } catch (err) {
      console.log(err);
      return (err);
    }
  }

  render(){
    
    return(
      <div>
        <BioPage 
          user={this.state.bioPageUserInfo } 
          loggedInAsUser={this.props.user}
          handleOnChangeText={this.handleOnChangeText.bind(this)} 
          searchText={this.state.searchText} 
          handleUserNameClick={this.handleUserNameClick.bind(this)} handleTitleClick={this.handleTitleClick.bind(this)} 
          handleOnDrop={this.handleOnDrop.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user,
    changedUserInfo: state.changePictureReducer.user
  };
};

export default connect(mapStateToProps, { changeUserPicture, selectedWorkout })(BioPageContainer);