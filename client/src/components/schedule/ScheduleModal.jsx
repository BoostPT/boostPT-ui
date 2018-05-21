import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import FlatButton from 'material-ui/FlatButton';

const saveButtonLabelStyle = {
  color: "#FFEB3B",
  fontSize: '13px',
  textTransform: "none",
}


class ScheduleModal extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className="scheduleModal">
        {this.props.scheduleModalVisible ? 
          <div className="modal-workout">
            <div className="scheduleModalContent">
              <p> Schedule {this.props.workoutName} </p>
              <IconButton
                onClick={(e)=>this.props.toggleModal(e, 'schedule')}
              >
                <Clear/>
              </IconButton>
              <span> date: </span>
              <DatePicker onChange={this.props.handleDateChange}/>
              <span> start: </span>
              <TimePicker onChange={this.props.handleStartTimeChange}/>
              <span> end: </span>
              <TimePicker onChange={this.props.handleEndTimeChange}/>
              <FlatButton 
                label="Save" 
                backgroundColor="#5A6978" 
                labelStyle={saveButtonLabelStyle} 
                onClick={this.props.handleSaveButtonClick}
              />
            </div>

          </div>
          : 
          null
        }
      </div>
    );
  }
}

export default ScheduleModal;