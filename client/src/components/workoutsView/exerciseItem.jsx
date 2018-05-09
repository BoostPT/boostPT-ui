import React, { Component } from 'react';
import ExerciseDetails from './exerciseDetails.jsx';

class ExerciseItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="border exercise-height">
        <div className="pos-title">
          <img className="float-right pad-right" src={require('../../../../client/dist/images/weight.png')}></img>
          <h2 className="float-left">Bench Press</h2>
          <div className="clear-float"></div>
        </div>
        <p className="float-left pad-bot pos-description">Wide grip, with a spotter</p>
        <div className="clear-float"></div>
        <div>
          {
            /*
          if type is strength
            <div>
              <span>reps: </span>
              <span>sets: </span>
            </div>

          iterate over each key in exercise object
          for each key...
            if value is not null and key is not title or description
            return exercise details component passing in the key and value to the child   
            */
            
            }
        </div>
      </div>
    );
  }
}

export default ExerciseItem;