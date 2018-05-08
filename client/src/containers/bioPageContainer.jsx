import React, { Component } from 'react';
import { connect } from 'react-redux';

import BioPage from '../components/bioPage/index.jsx';

class BioPageContainer extends Component {
  constructor(props){
    super(props);

    this.state = {

    };
  }

  render(){
    return(
      <div>
        <BioPage/>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    authenticated: state.authReducer.authenticated,
    userInfo: state.authReducer.user
  };
}

export default connect(mapStateToProps, null)(BioPageContainer);