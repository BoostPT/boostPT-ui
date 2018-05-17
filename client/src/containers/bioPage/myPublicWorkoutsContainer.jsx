import React, { Component } from 'react';
import { connect } from 'react-redux';
import PublicWorkOuts from '../../components/bioPage/workouts/publicWorkOuts.jsx';

import {  } from '../../actions/index.js';

class MyPublicWorkoutsContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <PublicWorkOuts 
        user={this.props.user}
      />
    );
  }
}


export default connect(null, null)(MyPublicWorkoutsContainer);