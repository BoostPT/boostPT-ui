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

import cloneDeep from 'lodash/cloneDeep';

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
  // 4th input 'id' is the array index and state exerciseForm key separated by comma, e.g. '2,Strength'
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
    this.state = {
      workoutName: '',
      exerciseForms: []
    };
    this.handleAddExerciseMenuClick = this.handleAddExerciseMenuClick.bind(this);
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleWorkoutNameInput = this.handleWorkoutNameInput.bind(this);
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

  handleWorkoutNameInput(e) {
    this.setState({
      workoutName: e.target.value
    });
  }

  handleFormInput(e) {
    const [index, key] = e.target.getAttribute('data').split(',');
    const formCopy = cloneDeep(this.state.exerciseForms);

    formCopy[index][key] = e.target.value;
    this.setState({
      exerciseForms: formCopy
    });
  }

  renderExerciseForms() {
    const renderFields = (type, index) => {
      if (type === 'Strength') {
        return (
          <div>
            {renderTextField('', 'Reps', this.handleFormInput, `${index},Reps`)}
            {renderTextField('', 'Sets', this.handleFormInput, `${index},Sets`)}
          </div>
        )
      } else if (type === 'Cardio') {
        return (
          <div>
            {renderTextField('', 'Distance', this.handleFormInput, `${index},Distance`)}
            {renderTextField('', 'Pace', this.handleFormInput, `${index},Pace`)}
            {renderTextField('', 'Goal Time', this.handleFormInput, `${index},Goal Time`)}
          </div>
        )
      } else if (type === 'Stretch') {
        return renderTextField('', 'Duration', this.handleFormInput, `${index},Goal Time`);
      }
    };

    return this.state.exerciseForms.map((exerciseForm, i) => {

      const className = classNames('exercise-form', { 'odd-greyed': i%2 === 1 });

      return (
        <div className={className} key={i}>
          {renderTextField('Exercise Name', `${exerciseForm.type} Exercise *`, this.handleFormInput, `${i},name`)}
          {renderTextField('', 'Description', this.handleFormInput, `${i},description`, true, 4)}
          {renderFields(exerciseForm.type, i)}
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
          <TextField
                     value={this.state.workoutName}
                     onChange={this.handleWorkoutNameInput}
                     className="create-wo-input"
                     hintText="Workout name (optional)"
                     underlineShow={false} />
          <Divider />
          {this.renderExerciseForms()}
          <Divider />
          {this.renderAddExerciseButton()}
          <div id="submit-wo-div">
            <Checkbox label="Make Private" checkedIcon={<Checkbox defaultChecked={true} iconStyle={{ color: 'black'}} />} />
            <RaisedButton id="submit-wo-btn"
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

export default CreateWorkout;