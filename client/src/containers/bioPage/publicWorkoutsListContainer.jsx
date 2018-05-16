import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getUserPublicWorkoutsList, selectedWorkout} from '../../actions/index.js';

import PublicWorkoutsList from '../../components/bioPage/workouts/publicWorkoutsList.jsx';
import PublicWorkoutItemContainer from './publicWorkoutItemContainer.jsx';

class PublicWorkoutsListContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getUserPublicWorkoutsList(this.props.user.id);
  }

  getEachExerciseCount(exercises) {
    return exercises.reduce((counts, exercise) => {
      counts[exercise.type] = counts[exercise.type] + 1 || 1;
      return counts;
    }, {});
  }

  handleWorkoutClick(workout) { 
    this.props.selectedWorkout(workout);
  }

  render(){
    return(
      <div className="publicWorkoutsListContainer">
        <PublicWorkoutsList 
          showTrashCan={this.props.user.showTrashCan}
          publicWorkouts={this.props.publicWorkouts}
          handleWorkoutClick={this.handleWorkoutClick.bind(this)}
          getEachExerciseCount={this.getEachExerciseCount.bind(this)}
        />
        <PublicWorkoutItemContainer 
          clickedWorkout={this.props.clickedWorkout}
          bioPageStyle={this.props.user.showTrashCan}
        />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    publicWorkouts: state.workoutsReducer.publicWorkouts,
    clickedWorkout: state.workoutsReducer.clickedWorkout
  };
};

export default connect(mapStateToProps, {getUserPublicWorkoutsList, selectedWorkout})(PublicWorkoutsListContainer);