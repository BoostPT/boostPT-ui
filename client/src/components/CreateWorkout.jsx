import React, { Component } from 'react';
import classNames from 'classnames';

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

const formUnderlineFocusStyle = {
  borderColor: colors.yellow500
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
      underlineFocusStyle={formUnderlineFocusStyle}
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
    const renderFields = (type) => {
      if (type === 'Strength') {
        return (
          <div>
            {renderTextField('', 'Reps (optional)')}
            {renderTextField('', 'Sets (optional)')}
          </div>
        )
      } else if (type === 'Cardio') {
        return (
          <div>
            {renderTextField('', 'Distance (optional)')}
            {renderTextField('', 'Pace (optional)')}
            {renderTextField('', 'Goal Time (optional)')}
          </div>
        )
      } else if (type === 'Stretch') {
        return renderTextField('', 'Duration (optional)');
      }
    };

    return this.state.exerciseForms.map((exerciseForm, i) => {

      const className = classNames('exercise-form', { 'odd-greyed': i%2 === 1 });

      return (
        <div className={className} key={i}>
          {renderTextField('Exercise Name', `${exerciseForm.type} Exercise`)}
          {renderTextField('', 'Description (optional)', true, 4)}
          {renderFields(exerciseForm.type)}
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