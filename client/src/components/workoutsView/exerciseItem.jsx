import React, { Component } from 'react';

class ExerciseItem extends Component {
  constructor(props) {
    super(props);
    this.types = {
      0: 'warm-up',
      1: 'strength',
      2: 'cardio',
      3: 'stretch'
    }
  }

  render() {
    const exercise = this.props.exercise;
    const type = this.types[exercise.type];
    return (
      <div className="border exercise-height">
        <div className="pos-title">
          <img className="float-right pad-right" src={require(`../../../../client/dist/images/${type}.png`)}></img>
          <h2 className="float-left">{exercise.name}</h2>
          <div className="clear-float"></div>
        </div>
        <p className="float-left pad-bot pos-description">{exercise.description || null}</p>
        <div className="clear-float"></div>
        <div className="pad-bot">
          {
            exercise.type === 1 ? 
              <div className="emphasize">
                <span className="pad-right">{<span className="nums">{exercise.reps}</span> || null} Reps</span>
                <span>{<span className="nums">{exercise.sets}</span> || null} Sets</span>
              </div>
              :
              <div className="emphasize">
                <p>{exercise.distance ? 'Distance: ' + exercise.distance : null}</p>
                <p>{exercise.goaltime ? exercise.type === 3 ? 'Duration: ' + exercise.goaltime : 'Goal Time: ' + exercise.goaltime : null}</p>
                <p>{exercise.pace ? 'Pace: ' + exercise.pace : null}</p>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default ExerciseItem;