import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWorkoutsList } from '../actions/index.js';
// import axios from 'axios';

import DashPage from '../components/dashPage/index.jsx';

class DashPageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: '',
      activeTab: 1
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleOnChangeText = this.handleOnChangeText.bind(this);
    this.handleUserNameClick = this.handleUserNameClick.bind(this);
  }

  handleTabSelect(tab) {
    this.setState({
      activeTab: tab.props.index
    });
  }

  handleOnChangeText(e){
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  handleUserNameClick(){
    // Grab biopageinfo for user from database put onto store?
    this.props.history.push(`/bio/${this.props.userInfo.id}`);
  }

  handleWorkoutsTabClick(){
    this.props.getWorkoutsList(this.props.userInfo.id);
  }
   
  render(){
    return(
      <DashPage userInfo={this.props.userInfo}
                activeTab={this.state.activeTab}
                handleTabSelect={this.handleTabSelect}
                handleOnChangeText={this.handleOnChangeText}
                searchText={this.state.searchText}
                handleUserNameClick={this.handleUserNameClick}
      />
    );
  }
}

const mapStateToProps = function(state) {
  return {
    authenticated: state.authReducer.authenticated,
    userInfo: state.authReducer.user
  };
};

export default connect(mapStateToProps, { getWorkoutsList })(DashPageContainer);