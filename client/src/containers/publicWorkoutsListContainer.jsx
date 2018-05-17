import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getUserPublicWorkoutsList} from '../actions/index.js';

import PublicWorkoutsList from '../components/bioPage/publicWorkoutsList.jsx';

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

  handleExerciseClick(workout) { 
    console.log("clicked");
  }

  render(){
    return(
      <PublicWorkoutsList 
        publicWorkouts={this.props.publicWorkouts}
        handleExerciseClick={this.handleExerciseClick.bind(this)}
        getEachExerciseCount={this.getEachExerciseCount.bind(this)}

        />
    );
  }
}

const mapStateToProps = function(state) {
  return {
    publicWorkouts: state.workoutsReducer.publicWorkouts
  };
};

export default connect(mapStateToProps, {getUserPublicWorkoutsList})(PublicWorkoutsListContainer);
