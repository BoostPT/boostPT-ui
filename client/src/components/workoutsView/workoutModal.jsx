import React, { Component } from 'react';

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
                <a className="float-left modal-btn pointer" onClick={(e) => this.props.handleYesClick(e, this.props.workoutId, this.props.workouts, this.props.userId)}>Yes</a>
                <a className="float-left modal-btn pointer" onClick={(e)=>this.props.toggleModal(e,'deleteWorkout')}>No</a>
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