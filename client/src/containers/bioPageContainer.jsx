import React, { Component } from 'react';
import { connect } from 'react-redux';
import BioPage from '../components/bioPage/index.jsx';
import { changeUserPicture } from '../actions/index.js';

class BioPageContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchText: '',
      bioPageUserInfo: this.props.location.state,
    }
  }
  handleOnChangeText(e){
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  handleUserNameClick(){
    this.props.history.push(`/bio/${this.props.userInfo.id}`);
  }

  handleTitleClick(){
    this.props.history.push({pathname: '/dash', state: this.state.bioPageUserInfo});
  }

  async handleOnDrop(files){
    const payload = {
      file: files,
      user: this.props.userInfo
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
          userInfo={this.state.bioPageUserInfo } 
          loggedInAsUser={this.props.userInfo}
          handleOnChangeText={this.handleOnChangeText.bind(this)} 
          searchText={this.state.searchText} 
          handleUserNameClick={this.handleUserNameClick.bind(this)} handleTitleClick={this.handleTitleClick.bind(this)} 
          handleOnDrop={this.handleOnDrop.bind(this)}
        />
      </div>
    );
  }
}
//comment for rebase
const mapStateToProps = function(state) {
  return {

    authenticated: state.auth.authenticated,
    userInfo: state.auth.user,
    changedUserInfo: state.changePictureReducer.user
  };
};

export default connect(mapStateToProps, { changeUserPicture })(BioPageContainer);