import React, { Component } from 'react';
import { connect } from 'react-redux';
import PublicWorkOuts from '../components/bioPage/publicWorkOuts.jsx';

import {  } from '../actions/index.js';

class MyPublicWorkoutsContainer extends Component {
  constructor(props){
    super(props);
  }

  // componentDidMount(){
  //   this.props.getPublicWorkoutsList(this.props.user.id);
  // }

  render(){
    return(
      <PublicWorkOuts 
        user={this.props.user}
        // workouts={this.props.publicWorkouts}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // publicWorkouts: ,
  }
};

export default connect(mapStateToProps, null)(MyPublicWorkoutsContainer);