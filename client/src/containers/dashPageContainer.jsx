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
<<<<<<< e402a4c076557d199a31a0f05ee3f57f798affe3
      activeTab: 1,
      UserfromBioPageChange: this.props.location.state
=======
      UserfromBioPageChange: this.props.location.state,
      activeTab: 1
>>>>>>> Working Updates of profile picture in bioPage and dashPage
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
<<<<<<< e402a4c076557d199a31a0f05ee3f57f798affe3
=======

>>>>>>> Working Updates of profile picture in bioPage and dashPage
    const stateToBioPage = (!this.state.UserfromBioPageChange ? this.props.userInfo : this.state.UserfromBioPageChange);
    this.props.history.push({pathname: `/bio/${this.props.userInfo.id}`, state: stateToBioPage});
  }

  handleWorkoutsTabClick(){
    this.props.getWorkoutsList(this.props.user.id);
  }
   
  render(){

    return(
      <DashPage user={!this.state.UserfromBioPageChange ?this.props.user : this.state.UserfromBioPageChange} 
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
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { getWorkoutsList })(DashPageContainer);