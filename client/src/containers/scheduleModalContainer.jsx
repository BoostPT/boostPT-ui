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
      startHour: null,
      startMinute: null,
      endHour: null,
      endMinute: null,
      seconds: 0,
      scheduledClient: this.props.userInfo.id,
      desc: null,
      dropDownValue: 1,

    }

    this.registered = false;
    this.dropDownValueText = null;
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

  async handleSaveButtonClick(e) {
    const payload = {
      month: this.state.month,
      day: this.state.day,
      year: this.state.year,
      startHour: this.state.startHour,
      startMinute: this.state.startMinute,
      endHour: this.state.endHour,
      endMinute: this.state.endMinute,
      second: this.state.seconds,
      userId: this.state.scheduledClient,
      workoutId: this.props.workoutId,
      workoutName: this.props.workoutName + ' - ' + this.dropDownValueText,
      desc: this.state.desc,
    }
    try {
      if(this.registered && this.dropDownValueText !== this.props.userInfo.username) { 
        const client = await this.props.scheduleEvent('workout', payload);
        payload.userId = this.props.userInfo.id
        const trainer = await this.props.scheduleEvent('workout', payload);

      } else {
        const client = await this.props.scheduleEvent('workout', payload);
      }
      
      this.props.toggleModal(e, 'schedule');
    } catch (err) {
      console.log(err);
      return(err);
    }
  }

  async handleStartTimeChange(e, date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    try {
      await this.setState({
        startHour: hour,
        startMinute: minute
      });
    } catch (err) {
      console.log(err);
      return (err);
    }
  }

  async handleEndTimeChange(e, date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    try {
      await this.setState({
        endHour: hour,
        endMinute: minute
      });
    } catch (err) {
      console.log(err);
      return (err);
    }
  }

  async handleDropDownChange (e, index, value ) {
    index === 0 || this.props.clients[index - 1].username ? this.registered = true : this.registered = false;
    
    if(this.registered) {
      if(index === 0) {
        this.dropDownValueText = this.props.userInfo.username;
        await this.setState({
          dropDownValue: value
        });
      } else {
        this.dropDownValueText = this.props.clients[index - 1].username;
        await this.setState({
          dropDownValue: value,
          scheduledClient: this.props.clients[index - 1].id
        });
      }
    }else {
      this.dropDownValueText = this.props.clients[index - 1].client_name;
      await this.setState({
        dropDownValue: value
      });
    }
  }

  async handleDateChange(e, date) {
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
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
      <ScheduleModal 
        scheduleModalVisible={this.props.scheduleModalVisible}
        user={this.props.userInfo}
        clients={this.props.clients} // for selecting which client feature
        workoutName={this.props.workoutName}
        workoutId={this.props.workoutId}
        toggleModal={this.props.toggleModal}
        dropDownValue={this.state.dropDownValue}
        // scheduledClient={this.state.scheduledClient}
        handleSaveButtonClick={this.handleSaveButtonClick.bind(this)}
        handleStartTimeChange={this.handleStartTimeChange.bind(this)}
        handleEndTimeChange={this.handleEndTimeChange.bind(this)}
        handleDateChange={this.handleDateChange.bind(this)}
        handleDropDownChange={this.handleDropDownChange.bind(this)}
      />
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