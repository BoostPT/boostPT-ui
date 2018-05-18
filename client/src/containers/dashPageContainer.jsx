import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  getWorkoutsList,
  getAllTrainersList,
  selectedWorkout
 } from '../actions/index.js';
import debounce from 'lodash/debounce';
// import axios from 'axios';

import DashPage from '../components/dashPage/index.jsx';

class DashPageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: 1,
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  handleTabSelect(tab) {
    this.setState({
      activeTab: tab.props.index
    });
  }

  handleWorkoutsTabClick(){
    this.props.getWorkoutsList(this.props.user.id);
  }
   
  render(){
    return(
      <DashPage user={!this.state.UserfromBioPageChange ?this.props.user : this.state.UserfromBioPageChange} 
                activeTab={this.state.activeTab}
                handleTabSelect={this.handleTabSelect}
                history={this.props.history}
      />
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.auth.user,
    trainers: state.client.trainers
  };
};

export default connect(mapStateToProps, { getWorkoutsList, getAllTrainersList, selectedWorkout })(DashPageContainer);