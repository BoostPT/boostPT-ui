import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  getWorkoutsList,
  getAllTrainersList,
  fetchTrainerRequestsIn,
  fetchTrainerRequestsOut
 } from '../actions/index.js';
import debounce from 'lodash/debounce';
import DashPage from '../components/dashPage/index.jsx';

class DashPageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: 1,
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  async componentDidMount() {
    await this.props.getAllTrainersList();
    await this.props.fetchTrainerRequestsIn(this.props.user.id);
    await this.props.fetchTrainerRequestsOut(this.props.user.id);
    await this.hideDropdownClick();
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
      <DashPage user={this.props.user} 
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
