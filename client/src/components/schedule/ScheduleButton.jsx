import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import * as colors from "material-ui/styles/colors";

const scheduleButtonStyle = {
  height: '30px',
  display: 'flex',
  position: 'relative',
  marginLeft: '90px',
  marginBottom: '5px',
  marginTop: '5px',
};

const scheduleLabelStyle = {
  fontFamily: 'Lato',
  color: '#EEE',
  fontSize: '1.4em',
  textTransform: "none",
};

class ScheduleButton extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
        <FlatButton 
          label="Schedule" 
          backgroundColor={colors.grey600}
          hoverColor={colors.grey700}
          rippleColor={colors.yellow500}
          style={scheduleButtonStyle} 
          labelStyle={scheduleLabelStyle} 
          onClick={(e)=>this.props.toggleModal(e,'schedule',this.props.workout.name,this.props.workout.id)}
        />
    );
  }
}

export default ScheduleButton;  