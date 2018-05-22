import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  getWorkoutsList,
  getAllTrainersList,
  fetchTrainerRequestsIn,
  fetchTrainerRequestsOut
 } from '../actions/index.js';
import debounce from 'lodash/debounce';
import io from 'socket.io-client';
// import axios from 'axios';

import DashPage from '../components/dashPage/index.jsx';

class DashPageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: 1,
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.socket = io('http://localhost:5000');
  }

  async componentDidMount() {
    await this.props.getAllTrainersList();
    await this.props.fetchTrainerRequestsIn(this.props.user.id);
    await this.props.fetchTrainerRequestsOut(this.props.user.id);
    await this.hideDropdownClick();
    await this.socket.emit('requestRoom', this.props.user.username);
    await this.socket.on('request', (data) => {
      console.log('RECEIVED NOTIFICATION FROM', data)
    });
  }

  handleTabSelect(tab) {
    this.setState({
      activeTab: tab.props.index
    });
  }

  handleWorkoutsTabClick(){
    this.props.getWorkoutsList(this.props.user.id);
  }

  showDropdownClick(e) {
    e.stopPropagation();
    this.setState({ showDropdown: true });
  }

  hideDropdownClick() {
    window.addEventListener('click', (e) => {
      this.setState({ showDropdown: false });
    });
  }    

  filterTrainers() {
    let filteredTrainers = this.props.trainers.filter(trainer => {
      if (this.state.searchText !== '') {
        return trainer.username.slice(0, this.state.searchText.length).includes(this.state.searchText);
      }
      return false;
    });
    this.setState({ filteredTrainers: filteredTrainers });
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

export default connect(mapStateToProps, { getWorkoutsList, getAllTrainersList, fetchTrainerRequestsIn, fetchTrainerRequestsOut })(DashPageContainer);
