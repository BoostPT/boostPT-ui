import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
  marginBottom: '20px',
};

const renderTextField = (hintText, floatingLabelText, handleChange, id, multiLine = false, rowsMax = 1) => {
  // 4th input parameter 'id' is the array index and exerciseForm key separated by comma, e.g. '2,Strength'
  return (
    <TextField
      hintText={hintText}
      floatingLabelText={floatingLabelText}
      floatingLabelStyle={exerciseFormFloatStyle}
      floatingLabelFixed={true}
      multiLine={multiLine}
      rowsMax={rowsMax}
      underlineFocusStyle={formUnderlineFocusStyle}
      data={id}
      onChange={handleChange}
    />
  )
};

class CreateWorkout extends Component {
  constructor(props) {
    super(props);
  }

  renderAddExerciseButton() {
    return (
      <div className="add-exercise-menu">
        <IconMenu
          iconButtonElement={<FloatingActionButton backgroundColor={colors.grey600} style={addExerciseStyle} mini={true}><ContentAdd /></FloatingActionButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem onClick={this.props.handleAddExerciseMenuClick} primaryText="Warm-up" />
          <MenuItem onClick={this.props.handleAddExerciseMenuClick} primaryText="Strength" />
          <MenuItem onClick={this.props.handleAddExerciseMenuClick} primaryText="Cardio" />
          <MenuItem onClick={this.props.handleAddExerciseMenuClick} primaryText="Stretch" />
        </IconMenu>
      </div>
    )
  }

  renderExerciseForms() {
    const renderFields = (type, index) => {
      if (type === 'Strength') {
        return (
          <div>
            {renderTextField('', 'Reps', this.props.handleFormInput, `${index},Reps`)}
            {renderTextField('', 'Sets', this.props.handleFormInput, `${index},Sets`)}
          </div>
        )
      } else if (type === 'Cardio') {
        return (
          <div>
            {renderTextField('', 'Distance', this.props.handleFormInput, `${index},Distance`)}
            {renderTextField('', 'Pace', this.props.handleFormInput, `${index},Pace`)}
            {renderTextField('', 'Goal Time', this.props.handleFormInput, `${index},Goal Time`)}
          </div>
        )
      } else if (type === 'Stretch') {
        return renderTextField('', 'Duration', this.props.handleFormInput, `${index},Goal Time`);
      }
    };

    return this.props.exerciseForms.map((exerciseForm, i) => {

      const className = classNames('exercise-form', { 'odd-greyed': i%2 === 1 });

      return (
        <div className={className} key={i}>
          {renderTextField('Exercise Name', `${exerciseForm.type} Exercise *`, this.props.handleFormInput, `${i},name`)}
          {renderTextField('', 'Description', this.props.handleFormInput, `${i},description`, true, 4)}
          {renderFields(exerciseForm.type, i)}
        </div>
      )
    });
  }

  render() {
    return (
      <Paper id="create-workout-outer" zDepth={5}>
        <div id="create-workout-inner">
          <h2 className="create-workout-header">Create Workout</h2>
          <br />
          <TextField
                     value={this.props.workoutName}
                     onChange={this.props.handleWorkoutNameInput}
                     className="create-wo-input"
                     hintText="Workout name (optional)"
                     underlineShow={false} />
          <Divider />
          {this.renderExerciseForms()}
          <Divider />
          {this.renderAddExerciseButton()}
          <div id="submit-wo-div">
            <Checkbox label="Make Private"
                      onCheck={this.props.handleMakePrivateCheck}
            />
            <RaisedButton id="submit-wo-btn"
                          onClick={this.props.handleFormSubmit}
                          backgroundColor={colors.grey800}
                          label="Save Workout"
                          labelColor={colors.yellow500}
                          style={saveWorkoutStyle} />
          </div>
        </div>
      </Paper>
    )
  }
}

CreateWorkout.propTypes = {
  user_id: PropTypes.number.isRequired,
  workoutName: PropTypes.string.isRequired,
  exerciseForms: PropTypes.array.isRequired,
  handleAddExerciseMenuClick: PropTypes.func.isRequired,
  handleWorkoutNameInput: PropTypes.func.isRequired,
  handleFormInput: PropTypes.func.isRequired,
  handleMakePrivateCheck: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired
};

export default CreateWorkout;