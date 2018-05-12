import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import { selectedWorkout } from '../../actions';

class WorkoutsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { workout: this.props.workout }
  }

  render() {
    const { name, created_at, is_public, exercises } = this.props.workout;
    const counts = this.props.getEachExerciseCount(this.props.workout.exercises);
    return (
      <div className="border font light-grey pointer" onClick={this.props.handleExerciseClick.bind(this)}>
        <div className="pos-abs full-width">
          <h5 className="title float-left font-title">{name}</h5>
          <p className="created float-right">created {moment(created_at).fromNow()}</p>
          <div className="clear-float"></div>
        </div>
        <div className="pad-top">
          <p className="exercises">Exercises</p>
          <p className="float-left pad">{counts[0] || 0} Warm-up<img className="shift-icon-down" src={require('../../../dist/images/Warm-up.png')}></img></p>
          <p className="float-left pad">{counts[2] || 0} Cardio<img className="shift-icon-down" src={require('../../../dist/images/Cardio.png')}></img></p>
          <div className="clear-float"></div>
          <p className="float-left pad">{counts[1] || 0} Strength<img className="shift-icon-down" src={require('../../../dist/images/Strength.png')}></img></p>
          <p className="float-left add-left-pad">{counts[3] || 0} Stretch<img className="shift-icon-down" src={require('../../../dist/images/Stretch.png')}></img></p>
          {
            is_public ? 
              <img className="float-right status" src={require('../../../dist/images/earth.png')}></img>
              :
              <img className="float-right status" src={require('../../../dist/images/lock.png')}></img>
          }
          <div className="clear-float"></div>
        </div>
      </div>
    );
  }
}
{/* <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}

export default connect(null, { selectedWorkout })(WorkoutsListItem);