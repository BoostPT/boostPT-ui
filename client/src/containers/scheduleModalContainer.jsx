import React, {Component} from 'react';
import { connect } from 'react-redux';
import ScheduleModal from '../components/schedule/ScheduleModal.jsx';

class ScheduleModalContainer extends Component{
  constructor(props){
    super(props);
  }

  handleSaveToCalendarClick(){

  }

  render(){
    return(
      <ScheduleModal 
        handleSaveToCalendarClick={this.handleSaveToCalendarClick.bind(this)}
        scheduleModalVisible={this.props.scheduleModalVisible}
        workoutName={this.props.workoutName}
      />
    );
  }
}

export default connect (null, {})(ScheduleModalContainer);