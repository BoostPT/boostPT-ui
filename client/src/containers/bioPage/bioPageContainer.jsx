import React, { Component } from 'react';
import { connect } from 'react-redux';
import BioPage from '../../components/bioPage/index.jsx';
import { changeUserPicture, selectedWorkout } from '../../actions/index.js';
import axios from 'axios';

class BioPageContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchText: '',
      bioPageUserInfo: this.props.history.location.state,
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
        bioPageUserInfo: this.props.user
      });
    } catch (err) {
      console.log(err);
      return (err);
    }
  }

  async handleRequestClick(e) {
    await axios.post(`http://localhost:8000/api/users/request`, {
      client_id: this.props.user.id,
      trainer_id: parseInt(e.target.dataset.id)
    }, 
    {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
  }

  render(){
    return(
      <div>
        <BioPage
          loggedInAsUser={this.props.user}
          handleOnChangeText={this.handleOnChangeText.bind(this)} 
          searchText={this.state.searchText} 
          handleUserNameClick={this.handleUserNameClick.bind(this)}
          handleOnDrop={this.handleOnDrop.bind(this)}
          history={this.props.history}
          user={this.props.history.location.state}
          handleRequestClick={this.handleRequestClick.bind(this)}
          requestsOut={this.props.requests.requestsOut}
        />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user,
    changedUserInfo: state.changePictureReducer.user,
    requests: { requestsIn: state.client.requestsIn, requestsOut: state.client.requestsOut }
  };
};

export default connect(mapStateToProps, { changeUserPicture, selectedWorkout })(BioPageContainer);