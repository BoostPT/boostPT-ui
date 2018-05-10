import React, { Component } from 'react';
import { connect } from 'react-redux';
import BioPage from '../components/bioPage/index.jsx';
import { changeUserPicture } from '../actions/index.js';

class BioPageContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchText: '',
      userInfo: this.props.userInfo
    }
  }

  handleOnChangeText(e){
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  handleUserNameClick(){
    // console.log(this.props.userInfo);
    // Grab biopageinfo for user from database put onto store?
    this.props.history.push(`/bio/${this.props.userInfo.id}`);
  }

  handleTitleClick(){
    this.props.history.push('/dash');
  }

  async handleOnDrop(files){
    const payload = {
      file: files,
      user: this.props.userInfo
    }
    try {
      const changed = await this.props.changeUserPicture(payload);
      await this.setState({
        userInfo: this.props.changedUserInfo
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