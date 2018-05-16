import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExerciseItem from './exerciseItem.jsx';
import moment from 'moment';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Public from 'material-ui/svg-icons/social/public';
import Private from 'material-ui/svg-icons/action/lock';
import * as colors from 'material-ui/styles/colors';

class WorkoutItem extends Component {
  constructor(props) {
    super(props);
  }

  renderPublicOrPrivate() {
    return this.props.clickedWorkout.is_public ? (
      <Public className="public-private-icon" color={colors.grey400} />
    ) : (
      <Private className="public-private-icon" color={colors.grey400} />
    );
  }

  renderStar() {
    return this.props.star ? (
      <Star className="star" color={colors.yellow800} hoverColor={colors.yellow900} onClick={this.props.handleStarWorkoutClick} />
    ) : (
      <StarBorder className="star" color={colors.grey500} hoverColor={colors.grey700} onClick={this.props.handleStarWorkoutClick} />
    )
  }

  render() {
    return (
      <div className="workout-container">
        {this.props.clickedWorkout ?
          <div className="font">
            <div className="hug-left">
              <h2 className="workout-title">
                {this.props.clickedWorkout.name}
                {this.renderPublicOrPrivate()}
                {this.renderStar()}
                <div className="clear-float"></div>
              </h2>
              <p>{moment(this.props.clickedWorkout.created_at).fromNow()}</p>
            </div>
            {this.props.clickedWorkout.exercises.map(exercise => <ExerciseItem user_id={this.props.user_id} key={exercise.id} exercise={exercise} clickedWorkout={this.props.clickedWorkout} />)}
          </div>
        :
        null}
      </div>
    );
  }
}

WorkoutItem.propTypes = {
  user_id: PropTypes.number.isRequired,
  clickedWorkout: PropTypes.object,
  sortExercises: PropTypes.func.isRequired,
  handleStarWorkoutClick: PropTypes.func.isRequired,
  star: PropTypes.bool
};

export default WorkoutItem;