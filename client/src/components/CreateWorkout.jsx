import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';

const addExerciseStyle = {
  marginTop: '20px',
  marginLeft: '20px'
};

const exerciseFormFloatStyle = {
  color: '#9E9E9E',
  fontSize: '14px'
};

const saveWorkoutStyle = {
  marginTop: '8px',
  marginBottom: '20px'
};

const renderTextField = (hintText, floatingLabelText, multiLine = false, rowsMax = 1) => {
  return (
    <TextField
      hintText={hintText}
      floatingLabelText={floatingLabelText}
      floatingLabelStyle={exerciseFormFloatStyle}
      floatingLabelFixed={true}
      multiLine={multiLine}
      rowsMax={rowsMax}
      underlineShow={false}
    />
  )
};

class CreateWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseForms: []
    };
    this.handleAddExerciseMenuClick = this.handleAddExerciseMenuClick.bind(this);
  }

  handleAddExerciseMenuClick(e) {
    let exerciseForm = {
      type: e.target.innerText
    };
    this.setState({ exerciseForms: [...this.state.exerciseForms, exerciseForm] });
  }

  renderAddExerciseButton() {
    return (
      <div className="add-exercise-menu">
        <IconMenu
          iconButtonElement={<FloatingActionButton backgroundColor={colors.grey600} style={addExerciseStyle} mini={true}><ContentAdd /></FloatingActionButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem onClick={this.handleAddExerciseMenuClick} primaryText="Warm-up" />
          <MenuItem onClick={this.handleAddExerciseMenuClick} primaryText="Strength" />
          <MenuItem onClick={this.handleAddExerciseMenuClick} primaryText="Cardio" />
          <MenuItem onClick={this.handleAddExerciseMenuClick} primaryText="Stretch" />
        </IconMenu>
      </div>
    )
  }

  renderExerciseForms() {

    // const addWarmupFields = () => {
    //   return (
    //     {renderTextField('Exercise Name', `${exerciseForm.type} Exercise`)}
    //   )
    // };

    return this.state.exerciseForms.map((exerciseForm, i) => {
      return (
        <div className="exercise-form" key={i}>
          {renderTextField('Exercise Name', `${exerciseForm.type} Exercise`)}
          {renderTextField('Enter Description (optional)', 'Description', true, 4)}
          <Divider />
        </div>
      )
    });
  }

  render() {
    return (
      <Paper id="create-workout-outer" zDepth={2}>
        <div id="create-workout-inner">
          <h2 className="create-workout-header">Create Workout</h2>
          <br />
          <TextField className="create-wo-input" hintText="Workout name (optional)" underlineShow={false} />
          <Divider />
          {this.renderExerciseForms()}
          <Divider />
          {this.renderAddExerciseButton()}
          <div id="submit-wo-div">
            <Checkbox label="Make Private" />
            <RaisedButton backgroundColor={colors.grey800} label="Save Workout" labelColor={colors.yellow500} style={saveWorkoutStyle} />
          </div>
        </div>
      </Paper>
    )
  }
}

export default CreateWorkout;