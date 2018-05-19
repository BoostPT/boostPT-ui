import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getWorkoutsList,
  selectedWorkout,
  getUserPublicWorkoutsList
} from '../actions/index.js';
import WorkoutsList from '../components/workoutsView/workoutsList.jsx';
import WorkoutModalContainer from './workoutModalContainer.jsx';
import ScheduleModalContainer from './scheduleModalContainer.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import Star from 'material-ui/svg-icons/toggle/star';
import * as colors from 'material-ui/styles/colors';

const filterTabStyle = {
  standard: {
    background: colors.grey700,
    color: colors.grey300,
    textTransform: "none"
  },
  active: {
    background: colors.grey700,
    color: "#FFEB3B",
    textTransform: "none"
  }
};

const starStyle = {
  standard: {
  },
  active: {
    color: "#FFEB3B"
  }
};

class WorkoutsListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalVisible: false,
      workoutId: null,
      workoutName: null,
      activeFilterTab: 0,
      scheduleModalVisible: false
    };
    this.handleWorkoutClick = this.handleWorkoutClick.bind(this);
    this.handleFilterTabSelect = this.handleFilterTabSelect.bind(this);
  }

  componentDidMount() {
    this.props.getWorkoutsList(this.props.userId);
    // !this.props.isPublic ? this.props.getWorkoutsList(this.props.userId) : this.props.getUserPublicWorkoutsList(this.props.user.id);
  }

  getEachExerciseCount(exercises) {
    if (Array.isArray(exercises)) {
      return exercises.reduce((counts, exercise) => {
        counts[exercise.type] = counts[exercise.type] + 1 || 1;
        return counts;
      }, {});
    }
  }

  handleWorkoutClick(workout) {
    this.props.selectedWorkout(workout);
  }

  handleFilterTabSelect(tab) {
    this.setState({
      activeFilterTab: tab.props.index
    });
  }

  filterWorkouts(workouts) {
    if (workouts) {
      return workouts.filter(workout => {
        if (this.state.activeFilterTab === 1) {
          if (workout.star) return true;
        } else {
          return true;
        }
      });
    }
    return [];
  }
  
  toggleModal(e, type, workoutName, workoutId) {
    e.stopPropagation();
    if(type === 'deleteWorkout'){
      this.setState({ 
        modalVisible: !this.state.modalVisible,
        workoutId:  workoutId || null,
        workoutName: workoutName || null
      });
    }else if(type === 'schedule'){
      console.log("inside workoutsList container");
      this.setState({ 
        scheduleModalVisible: !this.state.scheduleModalVisible,
        workoutId: workoutId || null,
        workoutName: workoutName || null
      });
    }
  }

  render() {
    const filterTabStyles = Array(2).fill('').map((v, i) => this.state.activeFilterTab === i ? 'active' : 'standard');

    return (
      <Fragment>
        <Tabs inkBarStyle={{display: "none"}} className="filter-workout-list-tabs">
          <Tab
            label="ALL"
            style={filterTabStyle[filterTabStyles[0]]}
            disableTouchRipple={true}
            onActive={this.handleFilterTabSelect}
          />
          <Tab
            icon={<Star style={starStyle[filterTabStyles[1]]} />}
            label="STARRED"
            style={filterTabStyle[filterTabStyles[1]]}
            disableTouchRipple={true}
            onActive={this.handleFilterTabSelect}
          />
        </Tabs>
        <WorkoutsList
         userId={this.props.userId}
         workouts={this.filterWorkouts(this.props.isPublic ? this.props.publicWorkouts : this.props.workouts)}
         getEachExerciseCount={this.getEachExerciseCount}
         handleWorkoutClick={this.handleWorkoutClick}
         toggleModal={this.toggleModal.bind(this)}
         isPublic={this.props.isPublic} 
        />
        <WorkoutModalContainer
         modalVisible={this.state.modalVisible}
         clickedWorkout={this.props.clickedWorkout}
         toggleModal={this.toggleModal.bind(this)}
         workouts={this.props.workouts}
         workoutId={this.state.workoutId}
         workoutName={this.state.workoutName}
         userId={this.props.userId}
        />
        <ScheduleModalContainer 
          scheduleModalVisible={this.state.scheduleModalVisible}
          workoutName={this.state.workoutName}
          workoutId={this.state.workoutId}
          toggleModal={this.toggleModal.bind(this)}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workoutsReducer.workouts,
    userId: state.auth.user.id,
    // publicWorkouts: state.workoutsReducer.publicWorkouts
  }
};

export default connect(mapStateToProps, { selectedWorkout, getWorkoutsList, getUserPublicWorkoutsList })(WorkoutsListContainer);