import React, { Component } from 'react';

class ExerciseItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="border exercise-height">
        <h4>Bench Press
          <img className="float-right" src={require('../../../../client/dist/images/weight.png')}></img>
        </h4>
        <p>Wide grip, with a spotter</p>
        <div>
          <span className="pad-right">10 reps</span>
          <span>3 sets</span>
        </div>
      </div>
    );
  }
}

export default ExerciseItem;