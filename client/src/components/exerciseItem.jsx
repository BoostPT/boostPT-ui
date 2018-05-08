import React, { Component } from 'react';

class ExerciseItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="font">
        <div className="hug-left">
          <h2 className="workout-title">
            My Workout #1
            <img className="float-right pad-right" src={require("../../../client/dist/images/lock.png")}></img>
            <div className="clear-float"></div>
          </h2>
          <p>Date Created: May 5, 2018</p>
        </div>
      </div>
    );
  }
}

export default ExerciseItem;