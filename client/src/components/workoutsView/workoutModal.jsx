import React, { Component } from 'react';

class WorkoutModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.modalVisible ? 
            <div className="modal">
              <div className="modal-content">
                <p>Delete workout {this.props.workoutName}?</p>
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