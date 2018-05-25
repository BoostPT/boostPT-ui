import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import * as colors from "material-ui/styles/colors";

const saveButtonLabelStyle = {
  fontFamily: 'Lato',
  fontSize: '1.2em',
  color: 'white',
  textTransform: 'none',
}

const saveButtonStyle = {
  width: '12vh',
  alignSelf: 'center',
  marginTop: '8%'
}

const pickerButtons = {
  primaryTextColor: colors.white,
  color: colors.grey600,
  textTransform: "none",
  rippleColor: colors.yellow500,
  fontFamily: 'Lato',
  fontSize: '1.0em',
}

const datePickerTheme = getMuiTheme({
  datePicker: {
    selectColor: colors.yellow500,
    headerColor: '#343F4B',
    selectTextColor: '#212121'
  },

  flatButton: pickerButtons
});

const timePickerTheme = getMuiTheme({
  timePicker: {
    headerColor: '#343F4B',
    accentColor: colors.yellow500,
    clockCircleColor: 'rgb(195, 202, 211)',
    selectTextColor: '#212121',
  },

  flatButton: pickerButtons
});

const pickerInputStyle = {
  fontFamily: 'Lato',
  textAlign: 'center'
}
class ScheduleModal extends Component {
  constructor(props){
    super(props);

  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction.bind(this), false);
  }

  escFunction(e) {
    if (e.keyCode === 27) {
      this.props.toggleModal(e, 'schedule');
    }
  }

  render(){
    // let items = [
    //   { value: 1, primaryText: 'Myself'}
    // ];
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
              <div className="selectors">
                <span className="scheduleModalSpan"> Date: </span>
                <MuiThemeProvider muiTheme={datePickerTheme}>
                  <DatePicker className="picker" onChange={this.props.handleDateChange} okLabel="Save" disableYearSelection={true} inputStyle={pickerInputStyle}/>
                </MuiThemeProvider>
                <span className="scheduleModalSpan"> Start Time: </span>
                <MuiThemeProvider muiTheme={timePickerTheme}>
                  <TimePicker className="picker" onChange={this.props.handleStartTimeChange} inputStyle={pickerInputStyle} minutesStep={5}/>
                </MuiThemeProvider>
                <span className="scheduleModalSpan"> End Time: </span>
                <MuiThemeProvider muiTheme={timePickerTheme}>
                  <TimePicker className="picker" onChange={this.props.handleEndTimeChange} inputStyle={pickerInputStyle} minutesStep={5}/>
                </MuiThemeProvider>
              </div>
              {/* <DropDownMenu value={this.props.dropDownValue}>
                <MenuItem/>
              </DropDownMenu> */}
              <FlatButton 
                label="Save" 
                backgroundColor={colors.grey600}
                hoverColor={colors.grey700}
                rippleColor={colors.yellow500}
                labelStyle={saveButtonLabelStyle} 
                onClick={this.props.handleSaveButtonClick}
                style={saveButtonStyle}
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