import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CreateWorkout from '../components/dashPage/CreateWorkout.jsx';
import ExerciseItem from '../components/workoutsView/exerciseItem.jsx';

import { swapArrayElements } from '../../lib/utils';
import axios from 'axios';
import omit from 'lodash/omit';
import shortid from 'shortid';
import PropTypes from "prop-types";

// Change where we load this from later?
const REST_SERVER_URL='http://localhost:8000/api';

class CreateWorkoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutName: '',
      exerciseForms: [],
      isPublic: true
    };
    this.handleAddExerciseMenuClick = this.handleAddExerciseMenuClick.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleWorkoutNameInput = this.handleWorkoutNameInput.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleSwapOrder = this.handleSwapOrder.bind(this);
    this.handleDeleteExercise = this.handleDeleteExercise.bind(this);
    this.handleMakePrivateCheck = this.handleMakePrivateCheck.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleAddExerciseMenuClick(e) {
    let exerciseForm = {
      type: e.target.innerText,
      name: '',
      description: ''
    };

    if (e.target.innerText === 'Strength') {
      exerciseForm['Reps'] = '';
      exerciseForm['Sets'] = '';
    } else if (e.target.innerText === 'Cardio') {
      exerciseForm['Distance'] = '';
      exerciseForm['Pace'] = '';
      exerciseForm['Goal Time'] = '';
    } else if (e.target.innerText === 'Stretch') {
      exerciseForm['Goal Time'] = '';
    }

    // Add render id so React can correctly re-render upon deletion
    exerciseForm.renderId = shortid.generate();
    exerciseForm.expanded = true;

    this.setState({ exerciseForms: [...this.state.exerciseForms, exerciseForm] });
  }

  handleFormInput(e) {
    const [index, key] = e.target.getAttribute('data').split(',');
    let formCopy = [...this.state.exerciseForms];
    formCopy[index][key] = e.target.value;
    this.setState({
      exerciseForms: formCopy
    });
  }

  handleWorkoutNameInput(e) {
    this.setState({
      workoutName: e.target.value
    });
  }

  handleExpand(e) {
    const renderId = e.currentTarget.getAttribute('data');
    let forms = [...this.state.exerciseForms];
    for (let i = 0; i < forms.length; i++) {
      if (forms[i].renderId === renderId) {
        forms[i].expanded = !forms[i].expanded;
        break;
      }
    }
    this.setState({ exerciseForms: forms });
  }

  handleSwapOrder(e) {
    const renderId = e.currentTarget.getAttribute('data');
    const arrow = e.currentTarget.getAttribute('data-arrow');
    let forms = [...this.state.exerciseForms];
    let i;
    for (i = 0; i < forms.length; i++) {
      if (forms[i].renderId === renderId) {
        break;
      }
    }
    if (arrow === 'up') {
      swapArrayElements(forms, i, i - 1);
    } else if (arrow === 'down') {
      swapArrayElements(forms, i, i + 1);
    }
    this.setState({ exerciseForms: forms });
  }

  handleDeleteExercise(e) {
    const renderId = e.currentTarget.getAttribute('data');
    this.setState({ exerciseForms: this.state.exerciseForms.filter(form => form.renderId !== renderId) });
  }

  handleMakePrivateCheck() {
    this.setState({
      isPublic: !this.state.isPublic
    });
  }

  async handleFormSubmit() {
    const forms = this.state.exerciseForms.map(form => omit(form, ['renderId', 'expanded']));
    const payload = {
      user_id: this.props.user_id,
      workoutName: this.state.workoutName,
      exerciseForms: forms,
      isPublic: this.state.isPublic
    };

    try {
      await axios.post(REST_SERVER_URL.concat('/workouts/addWorkout'), payload, {
        headers: {
          Authorization: `${document.cookie}`
        }
      });
      this.props.handleCreateWorkoutSuccess();
    }
    catch(err) {
      // Handle error, show message on client?
      console.log('Error submitting workout form', err);
    }
  }

  handleDeleteStarExercise(exercise) {
    const payload = {
      user_id: this.props.user_id,
      exercise_id: exercise.id
    };
    axios.post(REST_SERVER_URL.concat('/workouts/starexercise'), payload, {
      headers: {
        Authorization: `${document.cookie}`
      }
    });
  }

  renderStarredExercises() {
    return this.props.starredExercises.length ? (
      this.props.starredExercises.map(exercise => {
        return <ExerciseItem key={exercise.id} exercise={exercise} handleStarExerciseClick={this.handleDeleteStarExercise.bind(this, exercise)} />
      })
    ) : (
      <p className="starred-exercise-header">You haven't starred any exercises!</p>
    )
  }

  render() {
    return (
      <Fragment>
        <div className="starred-exercises-div">
          <h3 className="starred-exercise-header">Starred Exercises</h3>
          {this.renderStarredExercises()}
        </div>
        <CreateWorkout
          user_id={this.props.user_id}
          workoutName={this.state.workoutName}
          exerciseForms={this.state.exerciseForms}
          handleAddExerciseMenuClick={this.handleAddExerciseMenuClick}
          handleWorkoutNameInput={this.handleWorkoutNameInput}
          handleFormInput={this.handleFormInput}
          handleExpand={this.handleExpand}
          handleSwapOrder={this.handleSwapOrder}
          handleDeleteExercise={this.handleDeleteExercise}
          handleMakePrivateCheck={this.handleMakePrivateCheck}
          handleFormSubmit={this.handleFormSubmit}
        />
      </Fragment>
    )
  }
}

CreateWorkoutContainer.propTypes = {
  handleCreateWorkoutSuccess: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.user.id,
    starredExercises: state.workoutsReducer.starredExercises
  }
};

export default connect(mapStateToProps, null)(CreateWorkoutContainer);