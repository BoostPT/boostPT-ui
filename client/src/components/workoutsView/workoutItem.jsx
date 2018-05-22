import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExerciseItemContainer from '../../containers/exerciseItemContainer.jsx';
import moment from 'moment';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Public from 'material-ui/svg-icons/social/public';
import Private from 'material-ui/svg-icons/action/lock';
import shortid from 'shortid';
import * as colors from 'material-ui/styles/colors';

class WorkoutItem extends Component {
  constructor(props) {
    super(props);
  }

  renderPublicOrPrivate() {
    if(this.props.clickedWorkout) {
      return this.props.clickedWorkout.is_public ? (
        <Public className="public-private-icon" color={colors.grey400} />
      ) : (
        <Private className="public-private-icon" color={colors.grey400} />
      );
    } else {
      return null;
    }
  }

  renderStar() {
    return this.props.star ? (
      <Star className="star" color={colors.yellow800} hoverColor={colors.yellow900} onClick={this.props.handleStarWorkoutClick} />
    ) : (
      <StarBorder className="star" color={colors.grey500} hoverColor={colors.grey700} onClick={this.props.handleStarWorkoutClick} />
    )
  }

  renderClickedWorkout() {
    if (this.props.clickedWorkout.exercises.length) {
      return this.props.clickedWorkout.exercises.map(exercise => <ExerciseItemContainer key={shortid.generate()} exercise={exercise} />)
    } else {
      return null;
    }
  }

  render() {
    return ( 
      <div className="workout-container">
      {(this.props.clickedWorkout && Array.isArray(this.props.clickedWorkout.exercises))  ?
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
            {this.renderClickedWorkout()}
          </div>
          :
          this.props.clickedWorkout && Object.keys(this.props.clickedWorkout).length ? 
          <div className="font">
            <div className="hug-left">
              <h2 className="workout-title">
                {this.props.clickedWorkout.name}
                {this.renderPublicOrPrivate()}
                {this.renderStar()}
                <div className="clear-float"></div>
              </h2>
              <p>{!this.props.clickedWorkout ? null : moment(this.props.clickedWorkout.created_at).fromNow()}</p>
            </div>
          </div>
          :
          null
        }
        
      </div>
    );
  }
}

WorkoutItem.propTypes = {
  user_id: PropTypes.number.isRequired,
  clickedWorkout: PropTypes.object,
  handleStarWorkoutClick: PropTypes.func.isRequired,
  star: PropTypes.bool
};

export default WorkoutItem;