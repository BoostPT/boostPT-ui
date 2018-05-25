import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import * as colors from "material-ui/styles/colors";

const buttonLabelStyle = {
  fontFamily: 'Lato',
  fontSize: '1.2em',
  color: '#EEE',
  textTransform: 'none'
};

const buttonStyle = {
  height: '2.4em',
  width: '6.4em',
  margin: '.5em'
};

class WorkoutModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) { this.props.toggleModal(e,'deleteWorkout') }
    }, false);
  }

  render() {
    return (
      <div className="modal-font">
        {
          this.props.modalVisible ? 
            <div className="modal-workout" onClick={(e)=>this.props.toggleModal(e,'deleteWorkout')}>
              <div className="modal-workout-content">
                <p>Delete {this.props.workoutName}?</p>
                <FlatButton 
                 label="Yes"
                 onClick={(e) => this.props.handleYesClick(e, this.props.workoutId, this.props.workouts, this.props.userId)} 
                 backgroundColor={colors.grey600}
                 hoverColor={colors.grey700}
                 rippleColor={colors.yellow500}
                 labelStyle={buttonLabelStyle}
                 style={buttonStyle}
                />
                <FlatButton 
                 label="No"
                 onClick={(e)=>this.props.toggleModal(e,'deleteWorkout')} 
                 backgroundColor={colors.grey600}
                 hoverColor={colors.grey700}
                 rippleColor={colors.yellow500}
                 labelStyle={buttonLabelStyle}
                 style={buttonStyle}
                />
                {/* <a className="float-left modal-btn pointer" onClick={(e) => this.props.handleYesClick(e, this.props.workoutId, this.props.workouts, this.props.userId)}>Yes</a>
                <a className="float-left modal-btn pointer" onClick={(e)=>this.props.toggleModal(e,'deleteWorkout')}>No</a> */}
              </div>
            </div>
            :
            <div>
            </div>
        }
      </div>
    );
  }
}

export default WorkoutModal;