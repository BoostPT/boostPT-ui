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
                <p>Delete {this.props.clickedWorkout.name}?</p>
                <a 
                 className="float-left modal-btn pointer"
                 onClick={(e) => this.props.handleYesClick(e, this.props.clickedWorkout.id, this.props.userId)}
                >Yes</a>
                <a className="float-left modal-btn pointer" onClick={this.props.toggleModal}>No</a>
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