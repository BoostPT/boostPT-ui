import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import * as colors from "material-ui/styles/colors";

import {
  warmupSvg,
  strengthSvg,
  cardioSvg,
  stretchSvg
} from './svgHelper.js';

class ExerciseItem extends Component {
  constructor(props) {
    super(props);
    this.types = {
      0: 'warm-up',
      1: 'strength',
      2: 'cardio',
      3: 'stretch'
    };
  }

  renderSVGByType(type) {
    let svg;
    switch (type) {
      case 0:
        svg = warmupSvg;
        break;
      case 1:
        svg = strengthSvg;
        break;
      case 2:
        svg = cardioSvg;
        break;
      case 3:
        svg = stretchSvg;
    }
    return <img className="float-right pad-right" src={svg} />;
  }

  renderStar() {
    return this.props.exercise.star ? (
      <Star className="exercise-star" color={colors.yellow800} hoverColor={colors.yellow900} onClick={this.props.handleStarExerciseClick} />
    ) : (
      <StarBorder className="exercise-star" color={colors.grey500} hoverColor={colors.grey700} onClick={this.props.handleStarExerciseClick} />
    )
  }

  render() {
    const exercise = this.props.exercise;
    return (
      <div className="border exercise-height">
        <div className="pos-title">
          {this.renderSVGByType(exercise.type)}
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

ExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  handleStarExerciseClick: PropTypes.func
};

export default ExerciseItem;