import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  getWorkoutsList,
  getAllTrainersList,
  selectedWorkout
 } from '../actions/index.js';
import Navbar from '../components/dashPage/navbar.jsx';
import debounce from 'lodash/debounce';
// import axios from 'axios';

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
    this.props.history.push({pathname: `/bio/${this.props.user.id}`, state: stateToBioPage});
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

  handleSearchItemClick(e) {
    const stateToBioPage = (!this.state.UserfromBioPageChange ? this.props.user : this.state.UserfromBioPageChange);
    // send action to grab user at e.targer.dataset.id
    // set that user as state in history
    this.props.history.push({pathname: `/bio/${e.target.dataset.id}`, state: stateToBioPage});
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
    trainers: state.client.trainers
  };
};

export default connect(mapStateToProps, { getWorkoutsList, getAllTrainersList, selectedWorkout })(NavbarContainer);