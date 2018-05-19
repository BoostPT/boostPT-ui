import React, {Component} from 'react';
import { connect } from 'react-redux';
import ScheduleModal from '../components/schedule/ScheduleModal.jsx';

import { saveEvent } from '../actions/index.js';

class ScheduleModalContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      date: null,
      time: null
    }
  }

  handleSaveButtonClick(){

  }

  render(){
    return(
      // <div>
      <ScheduleModal 
        scheduleModalVisible={this.props.scheduleModalVisible}
        workoutName={this.props.workoutName}
        workoutId={this.props.workoutId}
        toggleModal={this.props.toggleModal}
        handleSaveButtonClick={this.handleSaveButtonClick.bind(this)}
      />
      // {console.log("schedule modal",this.props.workoutId, this.props.workoutName)}
      // </div>
    );
  }
}

export default connect (null, { saveEvent })(ScheduleModalContainer);