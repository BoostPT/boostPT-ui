import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';

import DashPage from '../components/dashPage/index.jsx';

class DashPageContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      searchText: ''
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

  render(){
    return(
      <DashPage userInfo={this.props.userInfo} handleOnChangeText={this.handleOnChangeText.bind(this)} searchText={this.state.searchText} handleUserNameClick={this.handleUserNameClick.bind(this)}/>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    authenticated: state.authReducer.authenticated,
    userInfo: state.authReducer.user
  };
}

export default connect(mapStateToProps, null)(DashPageContainer);

