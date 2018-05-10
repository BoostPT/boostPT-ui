import React, { Component } from 'react';
import { connect } from 'react-redux';
import BioPage from '../components/bioPage/index.jsx';
import { changeUserPicture } from '../actions/index.js';

class BioPageContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchText: '',
<<<<<<< e402a4c076557d199a31a0f05ee3f57f798affe3
      bioPageUserInfo: this.props.location.state,
=======
      userInfo: this.props.location.state
>>>>>>> Working Updates of profile picture in bioPage and dashPage
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
<<<<<<< e402a4c076557d199a31a0f05ee3f57f798affe3
    this.props.history.push({pathname: '/dash', state: this.state.bioPageUserInfo});
=======
    this.props.history.push({pathname: '/dash', state: this.state.userInfo});
>>>>>>> Working Updates of profile picture in bioPage and dashPage
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
          userInfo={this.props.userInfo}
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
    userInfo: state.auth.user
  };
};

export default connect(mapStateToProps, { changeUserPicture })(BioPageContainer);