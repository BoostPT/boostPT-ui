import React, { Component } from 'react';
import moment from 'moment';
import Star from 'material-ui/svg-icons/toggle/star';
import {
  warmupSvg,
  strengthSvg,
  cardioSvg,
  stretchSvg
} from './svgHelper.js';
import Public from 'material-ui/svg-icons/social/public';
import Private from 'material-ui/svg-icons/action/lock';
import Delete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';
import * as colors from "material-ui/styles/colors";

import ScheduleButton from '../schedule/ScheduleButton.jsx';

class WorkoutsListItem extends Component {
  constructor(props) {
    super(props);
  }

  handleWorkoutClick() {
    this.props.handleWorkoutClick(this.props.workout);
  }

  renderStar() {
    return this.props.workout.star ? (
      <Star className="star-void" color={colors.yellow800} />
    ) : (
      null
    )
  }

  render() {
    const { name, created_at, is_public, exercises } = this.props.workout;
    const counts = this.props.getEachExerciseCount(exercises) || [];
    return (
      <div className="border font light-grey pointer" onClick={this.handleWorkoutClick.bind(this)}>
        <div className="pos-abs full-width">
          <h5 className="title float-left font-title">{name}</h5>
          <p className="created float-right">created {moment(created_at).fromNow()}</p>
          {this.renderStar()}
          <div className="clear-float"></div>
        </div>
        <div className="pad-top">
          <p className="exercises">Exercises</p>
          <p className="float-left pad"><b>{counts[0] || 0}</b> Warm-up<img className="exercise-icon" src={warmupSvg} /></p>
          <p className="float-left pad"><b>{counts[2] || 0}</b> Cardio<img className="exercise-icon" src={cardioSvg} /></p>
          <div className="clear-float"></div>
          <p className="float-left pad"><b>{counts[1] || 0}</b> Strength<img className="exercise-icon" src={strengthSvg} /></p>
          <p className="float-left add-left-pad"><b>{counts[3] || 0}</b> Stretch<img className="exercise-icon" src={stretchSvg} /></p>
          {
            is_public ?

              <Public className="float-right status" color={colors.grey400} />
              :
              <Private className="float-right status" color={colors.grey400} />
            }
            {!this.props.isPublic ? 
              <Delete className="float-left delete-icon" color={colors.grey500} hoverColor={colors.grey700} data-id={this.props.workout.id} data-name={this.props.workout.name} onClick={(e) => this.props.toggleModal(e)} />
              : 
              null
            }
            <ScheduleButton handleOnClick={this.props.handleScheduleButtonOnClick}/>
            <div className="clear-float"></div>
          </div>
        </div>
    
      );
  }
}
{/* <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}

export default WorkoutsListItem;