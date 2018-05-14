import React, { Component } from 'react';

class WorkoutModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal-font">
        {
          this.props.modalVisible ? 
            <div className="modal-workout">
              <div className="modal-workout-content">
                <p>Delete {this.props.workoutName}?</p>
                <a className="float-left modal-btn pointer">Yes</a>
                <a className="float-left modal-btn pointer">No</a>
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