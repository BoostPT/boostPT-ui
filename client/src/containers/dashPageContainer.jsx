import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';

import DashPage from '../components/dashPage/index.jsx';

class DashPageContainer extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <DashPage user={this.props.user}/>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.authReducer
  };
}

export default connect(mapStateToProps, null)(DashPageContainer);

