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

  render(){
    return(
      <DashPage user={this.props.user} handleOnChangeText={this.handleOnChangeText.bind(this)} searchText={this.state.searchText}/>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.authReducer
  };
}

export default connect(mapStateToProps, null)(DashPageContainer);

