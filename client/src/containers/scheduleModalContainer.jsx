import React, {Component} from 'react';
import { connect } from 'react-redux';
import ScheduleModal from '../components/schedule/ScheduleModal.jsx';

import { scheduleEvent, trainerClientList } from '../actions/index.js';

class ScheduleModalContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      day: null,
      month: null,
      year: null,
      hour: null,
      minute: null,
      seconds: 0,
      scheduledClient: null,
      desc: null
    }
  }

  async componentDidMount() {
    const payload = {
      id: this.props.userInfo.id,
    }
    try {
      const result = await this.props.trainerClientList(payload);
    } catch (err) {
      return (err);
    }
  }// used to fetch loggedInTrainer's Clients while on Modal view

  async handleSaveButtonClick() {
    const payload = {
      month: this.state.month,
      day: this.state.day,
      year: this.state.year,
      hour: this.state.hour,
      minute: this.state.minute,
      second: this.state.seconds,
      userId: !this.state.scheduledClient? this.props.userInfo.id : this.state.scheduledClient,
      workoutId: this.props.workoutId,
      workoutName: this.props.workoutName,
      desc: this.state.desc
    }
    try {
      await this.props.scheduleEvent('workout', payload);
    } catch (err) {
      console.log(err);
      return(err);
    }
  }

  async handleTimeChange(e, date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    try {
      await this.setState({
        hour,
        minute
      });
    } catch (err) {
      console.log(err);
      return (err);
    }
  }

  async handleDateChange(e, date) {
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    try {
      await this.setState({
        day,
        month,
        year
      });
    } catch (err) {
      console.log(err);
      return (err);
    }
  }

  render() {
    return(
      // <div>
      <ScheduleModal 
        scheduleModalVisible={this.props.scheduleModalVisible}
        clients={this.props.clients} // for selecting which client 
        workoutName={this.props.workoutName}
        workoutId={this.props.workoutId}
        toggleModal={this.props.toggleModal}
        handleSaveButtonClick={this.handleSaveButtonClick.bind(this)}
        handleTimeChange={this.handleTimeChange.bind(this)}
        handleDateChange={this.handleDateChange.bind(this)}
      />
      // {console.log("schedule modal",this.props.workoutId, this.props.workoutName)}
      // </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    clients: state.trainer.clients,
    userInfo: state.auth.user
  };
};

export default connect (mapStateToProps, { scheduleEvent, trainerClientList })(ScheduleModalContainer);