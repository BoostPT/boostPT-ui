import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import FlatButton from 'material-ui/FlatButton';
import { yellow500, white } from 'material-ui/styles/colors';

const saveButtonLabelStyle = {
  color: "#FFEB3B",
  fontSize: '13px',
  textTransform: "none",
}

const pickerButtons = {
  // textColor: white,
  primaryTextColor: white,
  color: '#343F4B',
  textTransform: "none"
}

const datePickerTheme = getMuiTheme({
  datePicker: {
    selectColor: yellow500,
    headerColor: '#343F4B',
    selectTextColor: '#212121'
  },

  flatButton: pickerButtons
});

const timePickerTheme = getMuiTheme({
  timePicker: {
    headerColor: '#343F4B',
    accentColor: yellow500,
    clockCircleColor: 'rgb(195, 202, 211)',
    selectTextColor: '#212121',
  },

  flatButton: pickerButtons
});

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
              <div className="scheduleModalTitle">
                <p> Schedule {this.props.workoutName} </p>
                <IconButton
                  onClick={(e)=>this.props.toggleModal(e, 'schedule')}
                >
                  <Clear/>
                </IconButton>
              </div>
              <span> Date: </span>
              <MuiThemeProvider muiTheme={datePickerTheme}>
                <DatePicker onChange={this.props.handleDateChange} okLabel="Save" disableYearSelection={true}/>
              </MuiThemeProvider>
              <div className="timeSelectors">
                <span> Start Time: </span>
                <MuiThemeProvider muiTheme={timePickerTheme}>
                  <TimePicker onChange={this.props.handleStartTimeChange}/>
                </MuiThemeProvider>
                <span> End Time: </span>
                <MuiThemeProvider muiTheme={timePickerTheme}>
                  <TimePicker onChange={this.props.handleEndTimeChange}/>
                </MuiThemeProvider>
              </div>
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