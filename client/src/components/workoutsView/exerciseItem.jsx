import React, { Component } from 'react';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import * as colors from "material-ui/styles/colors";
import axios from "axios/index";

// Change where we load this from later?
const REST_SERVER_URL='http://localhost:8000/api';

class ExerciseItem extends Component {
  constructor(props) {
    super(props);
    this.types = {
      0: 'warm-up',
      1: 'strength',
      2: 'cardio',
      3: 'stretch'
    };
    this.handleStarExerciseClick = this.handleStarExerciseClick.bind(this);
  }

  handleStarExerciseClick() {
    // let updatedExercise = Object.assign({}, this.props.exercise);
    const payload = {
      user_id: this.props.user_id,
      exercise_id: this.props.exercise.id
    };
    axios.post(REST_SERVER_URL.concat('/workouts/starexercise'), payload, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
    // updatedExercise.star = !updatedWorkout.star;
  }

  renderStar() {
    return this.props.exercise.star ? (
      <Star className="exercise-star" color={colors.yellow800} hoverColor={colors.yellow900} onClick={this.handleStarExerciseClick} />
    ) : (
      <StarBorder className="exercise-star" color={colors.grey500} hoverColor={colors.grey700} onClick={this.handleStarExerciseClick} />
    )
  }

  render() {
    const exercise = this.props.exercise;
    const type = this.types[exercise.type];
    return (
      <div className="border exercise-height">
        <div className="pos-title">
          <img className="float-right pad-right" src={require(`../../../../client/dist/images/${type}.png`)}></img>
          {this.renderStar()}
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