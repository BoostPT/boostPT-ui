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
      // <div>
      <ScheduleModal 
        handleSaveToCalendarClick={this.handleSaveToCalendarClick.bind(this)}
        scheduleModalVisible={this.props.scheduleModalVisible}
        workoutName={this.props.workoutName}
        workoutId={this.props.workoutId}
      />
      // {console.log("schedule modal",this.props.workoutId, this.props.workoutName)}
      // </div>
    );
  }
}

export default connect (null, null)(ScheduleModalContainer);