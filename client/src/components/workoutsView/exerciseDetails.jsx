import React, { Component } from 'react';

class ExerciseDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="border exercise-height">
        <span>{this.props.name}</span>: <span>{this.props.content}</span>
      </div>
    );
  }
}

export default ExerciseDetails;