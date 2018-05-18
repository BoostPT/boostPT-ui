import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

const scheduleButtonStyle = {
  height: '30px',
  display: 'flex',
  position: 'relative',
  marginLeft: '90px',
  marginBottom: '5px',
  marginTop: '5px',
}

const scheduleLabelStyle = {
  color: "#FFEB3B",
  fontSize: '13px',
  textTransform: "none",
}

class ScheduleButton extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <FlatButton label="Schedule" backgroundColor="#5A6978" style={scheduleButtonStyle} labelStyle={scheduleLabelStyle} onClick={this.props.handleOnClick}/>
    );
  }
}

export default ScheduleButton;