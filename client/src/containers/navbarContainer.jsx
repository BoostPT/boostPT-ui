import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  getWorkoutsList,
  getAllTrainersList,
  selectedWorkout,
 } from '../actions/index.js';
import Navbar from '../components/dashPage/navbar.jsx';
import debounce from 'lodash/debounce';
import axios from 'axios';

class NavbarContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: '',
      showDropdown: false,
      filteredTrainers: [],
      UserfromBioPageChange: this.props.location ? this.props.location.state : null
    };
    this.handleOnChangeText = this.handleOnChangeText.bind(this);
    this.handleUserNameClick = this.handleUserNameClick.bind(this);
    this.filterTrainers = debounce(this.filterTrainers, 250);
    this.showDropdownClick = this.showDropdownClick.bind(this);
    this.handleSearchItemClick = this.handleSearchItemClick.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  handleTitleClick(){
    this.props.selectedWorkout({});
    this.props.history.push({pathname: '/dash', state: this.state.bioPageUserInfo});
  }

  handleUserNameClick(){
    const stateToBioPage = (!this.state.UserfromBioPageChange ? this.props.user : this.state.UserfromBioPageChange);
    this.props.selectedWorkout({});
    const user = Object.assign({}, this.props.user, { publicWorkouts: this.props.userWorkouts});
    this.props.history.push({pathname: `/bio/${this.props.user.id}`, state: user});
  }

  handleOnChangeText(e){
    const {value, name} = e.target;
    this.setState({[name]: value});
    this.filterTrainers();
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

  async handleSearchItemClick(e) {
    e.persist();
    const trainer = this.props.trainers.filter(trainer => trainer.id === parseInt(e.target.dataset.id))[0];
    const publicWorkouts = await axios.get(`http://localhost:8000/api/workouts/public/user/${trainer.id}`, { headers: { Authorization: `${document.cookie}`} });
    if (Array.isArray(publicWorkouts.data)) {
      for (let workout of publicWorkouts.data) {
        let exercises = await axios.get(`http://localhost:8000/api/workouts/exercises/${workout.id}`, { headers: { Authorization: `${document.cookie}`} });
        workout.exercises = exercises.data;
      }
      trainer.publicWorkouts = publicWorkouts.data;
      this.props.history.push({pathname: `/bio/${e.target.dataset.id}`, state: trainer});
    } else {
      trainer.publicWorkouts = [];
      this.props.history.push({pathname: `/bio/${e.target.dataset.id}`, state: trainer});
    }    
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

  componentDidMount() {
    this.props.getAllTrainersList();
    this.hideDropdownClick();
  }
   
  render(){
    return(
      <Navbar 
      user={this.props.user}
      handleOnChangeText={this.handleOnChangeText}
      searchText={this.state.searchText}
      handleUserNameClick={this.handleUserNameClick}
      handleTitleClick={this.handleTitleClick}
      handleSearchBarClick={this.handleSearchBarClick}
      filteredTrainers={this.state.filteredTrainers}
      showDropdown={this.state.showDropdown}
      showDropdownClick={this.showDropdownClick}
      handleSearchItemClick={this.handleSearchItemClick}
      />
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.auth.user,
    userWorkouts: state.workoutsReducer.workouts,
    trainers: state.client.trainers
  };
};

export default connect(mapStateToProps, { getWorkoutsList, getAllTrainersList, selectedWorkout })(NavbarContainer);