import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { 
  getWorkoutsList,
  getAllTrainersList,
  selectedWorkout,
  logOutUser,
  deleteTrainerRequest,
  addTrainerClientConnection,
  fetchTrainerRequestsIn
 } from '../actions/index.js';
import Navbar from '../components/dashPage/navbar.jsx';
import debounce from 'lodash/debounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import io from 'socket.io-client';
import axios from 'axios';

class NavbarContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: '',
      showDropdown: false,
      filteredTrainers: [],
      showRequests: false
    };
    this.socket = io('http://localhost:5000');
    this.handleOnChangeText = this.handleOnChangeText.bind(this);
    this.handleUserNameClick = this.handleUserNameClick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.filterTrainers = debounce(this.filterTrainers, 250);
    this.showDropdownClick = this.showDropdownClick.bind(this);
    this.handleSearchItemClick = this.handleSearchItemClick.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleRequestsClick = this.handleRequestsClick.bind(this);
    this.handleRequestOptionNoClick = this.handleRequestOptionNoClick.bind(this);
    this.handleRequestOptionYesClick = this.handleRequestOptionYesClick.bind(this);
  }

  componentDidMount() {
    this.props.getAllTrainersList();
    this.hideDropdownClick();
    this.socket.emit('requestRoom', this.props.user.username);
    this.socket.on('request', async (data) => {
      toast.warn('New Trainer Request!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      await this.props.fetchTrainerRequestsIn(this.props.user.id);
    });
  }

  componentWillUnmount() {
    this.socket.removeListener();
  }

  handleTitleClick(){
    this.props.selectedWorkout({});
    const user = Object.assign({}, this.props.user, { publicWorkouts: this.props.userWorkouts});
    this.props.history.push({pathname: '/dash', state: user});
  }

  handleUserNameClick(){
    this.props.selectedWorkout({});
    const pubWorkouts = this.props.userWorkouts.filter(workout=>{
      return workout.is_public;
    });
    const user = Object.assign({}, this.props.user, { publicWorkouts: pubWorkouts});
    this.props.history.push({pathname: `/bio/${this.props.user.id}`, state: user});
  }

  handleLogOut() {
    document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.props.logOutUser();
    this.props.history.push('/');
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
    this.props.selectedWorkout({});
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

  handleRequestsClick() {
    this.setState({ showRequests: !this.state.showRequests });
  }

  async handleRequestOptionYesClick(e) {
    e.persist();
    await this.props.addTrainerClientConnection(e.target.dataset.id, this.props.user.id, this.props.clients);
    await this.props.deleteTrainerRequest(e.target.dataset.id, this.props.user.id, this.props.requestsIn);
  }

  async handleRequestOptionNoClick(e) {
    await this.props.deleteTrainerRequest(e.target.dataset.id, this.props.user.id, this.props.requestsIn);
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
      <Fragment>
        <Navbar 
        user={this.props.user}
        handleOnChangeText={this.handleOnChangeText}
        searchText={this.state.searchText}
        handleUserNameClick={this.handleUserNameClick}
        handleLogOut={this.handleLogOut}
        handleTitleClick={this.handleTitleClick}
        filteredTrainers={this.state.filteredTrainers}
        showDropdown={this.state.showDropdown}
        showDropdownClick={this.showDropdownClick}
        handleSearchItemClick={this.handleSearchItemClick}
        showRequests={this.state.showRequests}
        handleRequestsClick={this.handleRequestsClick}
        requestsIn={this.props.requestsIn}
        handleRequestOptionYesClick={this.handleRequestOptionYesClick}
        handleRequestOptionNoClick={this.handleRequestOptionNoClick}
        />
        <ToastContainer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    userWorkouts: state.workoutsReducer.workouts,
    trainers: state.client.trainers,
    requestsIn: state.client.requestsIn,
    clients: state.trainer.clients
  };
};

export default connect(mapStateToProps, { 
  getWorkoutsList,
  getAllTrainersList,
  selectedWorkout,
  logOutUser,
  deleteTrainerRequest,
  addTrainerClientConnection,
  fetchTrainerRequestsIn
})(NavbarContainer);