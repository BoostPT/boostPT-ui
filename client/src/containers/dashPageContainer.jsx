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
      searchText: '',
      activeTab: 1,
      UserfromBioPageChange: this.props.location.state,
      showDropdown: false,
      filteredTrainers: [{id: 1, username: "gus", email: "gus@cheesemail.com", picture: null}, {id: 2, username: "aaron", email: "aaron@cheesemail.com", picture: null}]
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleOnChangeText = this.handleOnChangeText.bind(this);
    this.handleUserNameClick = this.handleUserNameClick.bind(this);
    this.filterTrainers = debounce(this.filterTrainers, 250);
  }

  handleTabSelect(tab) {
    this.setState({
      activeTab: tab.props.index
    });
  }

  handleOnChangeText(e){
    const {value, name} = e.target;
    this.setState({[name]: value});
    this.filterTrainers();
  }

  handleUserNameClick(){
    const stateToBioPage = (!this.state.UserfromBioPageChange ? this.props.user : this.state.UserfromBioPageChange);
    this.props.selectedWorkout({});
    this.props.history.push({pathname: `/bio/${this.props.user.id}`, state: stateToBioPage});
  }

  handleWorkoutsTabClick(){
    this.props.getWorkoutsList(this.props.user.id);
  }

  handleSearchBarClick() {
    console.log('typed');
  }

  filterTrainers() {
    let filteredTrainers = this.props.trainers.filter(trainer => {
      return trainer.username.slice(0, this.state.searchText.length).includes(this.state.searchText);
    });
    this.setState({ filteredTrainers: filteredTrainers });
  }

  componentWillMount() {
    // fetch all trainers from db
    this.props.getAllTrainersList();
  }
   
  render(){

    return(
      <DashPage user={!this.state.UserfromBioPageChange ?this.props.user : this.state.UserfromBioPageChange} 
                activeTab={this.state.activeTab}
                handleTabSelect={this.handleTabSelect}
                handleOnChangeText={this.handleOnChangeText}
                searchText={this.state.searchText}
                handleUserNameClick={this.handleUserNameClick}
                handleSearchBarClick={this.handleSearchBarClick}
                filteredTrainers={this.state.filteredTrainers}
                showDropdown={this.state.showDropdown}
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

<<<<<<< HEAD
export default connect(mapStateToProps, { getWorkoutsList, selectedWorkout })(DashPageContainer);
=======
export default connect(mapStateToProps, { getWorkoutsList, getAllTrainersList })(DashPageContainer);
>>>>>>> Moved componentDidMount to dash page container
