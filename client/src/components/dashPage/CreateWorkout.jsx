import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Expanded from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Collapsed from 'material-ui/svg-icons/navigation-arrow-drop-right';
import UpArrow from 'material-ui/svg-icons/navigation/arrow-upward';
import DownArrow from 'material-ui/svg-icons/navigation/arrow-downward';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import * as colors from 'material-ui/styles/colors';

const createWorkoutBtnLabelStyle = {
  fontFamily: 'Lato',
  fontSize: '1.2em',
  textTransform: 'none',
  color: '#EEE'
};

const createWorkoutBtnStyle = {
  height: '3.2em',
  width: '12em',
  margin: '1.2em',
  justifyContent: 'center'
};

const renderTextField = (value, hintText, floatingLabelText, handleChange, id, multiLine = false, rowsMax = 1) => {
  // 4th input parameter 'id' is the array index and exerciseForm key separated by comma, e.g. '2,Strength'
  return (
    <TextField
      hintText={hintText}
      floatingLabelText={floatingLabelText}
      floatingLabelStyle={{ color: '#9E9E9E', fontSize: '14px'}}
      floatingLabelFixed={true}
      multiLine={multiLine}
      rowsMax={rowsMax}
      underlineFocusStyle={{ borderColor: colors.yellow500 }}
      data={id}
      value={value}
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
          iconButtonElement={<FloatingActionButton className="add-exercise" backgroundColor={colors.grey600} mini={true}><ContentAdd /></FloatingActionButton>}
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

  renderExpandIcon(expanded, renderId) {
    return expanded ? (
      <Expanded className="expand" data={renderId} color={colors.grey800} onClick={this.props.handleExpand} />
    ) : (
      <Collapsed className="expand" data={renderId} color={colors.grey400} onClick={this.props.handleExpand} />
    );
  }

  renderSwapArrows(renderId, index, length) {
    const upArrow = <UpArrow className="swap-arrow" data={renderId} data-arrow="up" color={colors.grey400} hoverColor={colors.grey800} onClick={this.props.handleSwapOrder} />;
    const downArrow = <DownArrow className="swap-arrow" data={renderId} data-arrow="down" color={colors.grey400} hoverColor={colors.grey800} onClick={this.props.handleSwapOrder} />;
    if (length === 1) return null;
    if (length === 2) {
      if (index === 0) {
        return downArrow;
      } else {
        return upArrow;
      }
    } else {
      if (index === 0) {
        return downArrow;
      } else if (index === length - 1) {
        return upArrow;
      } else {
        return (
          <Fragment>
            {downArrow}
            {upArrow}
          </Fragment>
        )
      }
    }
  }

  renderExerciseForms() {
    const renderFields = (form, index) => {
      if (form.type === 'Warm-up' && form.expanded) {
        return (
          <Fragment>
            {renderTextField(form.description, '', 'Description', this.props.handleFormInput, `${index},description`, true, 4)}
          </Fragment>
        )
      } else if (form.type === 'Strength' && form.expanded) {
        return (
          <Fragment>
            {renderTextField(form.description, '', 'Description', this.props.handleFormInput, `${index},description`, true, 4)}
            {renderTextField(form['Reps'], '', 'Reps', this.props.handleFormInput, `${index},Reps`)}
            {renderTextField(form['Sets'], '', 'Sets', this.props.handleFormInput, `${index},Sets`)}
          </Fragment>
        )
      } else if (form.type === 'Cardio' && form.expanded) {
        return (
          <Fragment>
            {renderTextField(form.description, '', 'Description', this.props.handleFormInput, `${index},description`, true, 4)}
            {renderTextField(form['Distance'], '', 'Distance', this.props.handleFormInput, `${index},Distance`)}
            {renderTextField(form['Pace'], '', 'Pace', this.props.handleFormInput, `${index},Pace`)}
            {renderTextField(form['Goal Time'], '', 'Goal Time', this.props.handleFormInput, `${index},Goal Time`)}
          </Fragment>
        )
      } else if (form.type === 'Stretch' && form.expanded) {
        return (
          <Fragment>
            {renderTextField(form.description, '', 'Description', this.props.handleFormInput, `${index},description`, true, 4)}
            {renderTextField(form['Goal Time'], '', 'Duration', this.props.handleFormInput, `${index},Goal Time`)}
          </Fragment>
        );
      } else return null;
    };

    return this.props.exerciseForms.map((exerciseForm, i) => {

      const className = classNames('exercise-form', { 'odd-greyed': i%2 === 1 });

      return (
        <li className={className} key={exerciseForm.renderId}>
          {renderTextField(exerciseForm.name, 'Exercise Name', `${exerciseForm.type} Exercise *`, this.props.handleFormInput, `${i},name`)}
          <ContentClear className="delete-exercise"
                        data={exerciseForm.renderId}
                        color={colors.grey400}
                        hoverColor={colors.grey800}
                        onClick={this.props.handleDeleteExercise} />
          {this.renderExpandIcon(exerciseForm.expanded, exerciseForm.renderId)}
          {this.renderSwapArrows(exerciseForm.renderId, i, this.props.exerciseForms.length)}
          {renderFields(exerciseForm, i)}
        </li>
      )
    });
  }

  render() {
    return (
      <Paper id="create-workout-outer" zDepth={5} style={{backgroundColor: '#EEE'}}>
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
          <ol>
            {this.renderExerciseForms()}
          </ol>
          <Divider />
          {this.renderAddExerciseButton()}
          <div id="submit-wo-div">
            <Checkbox label="Make Private"
                      className="make-private"
                      iconStyle={{ fill: '#49525d' }}
                      labelStyle={{fontFamily: 'Lato'}}
                      onCheck={this.props.handleMakePrivateCheck}
            />
            <FlatButton
              id="submit-wo-btn"
              className="save-workout-btn"
              label="Save Workout"
              backgroundColor={colors.grey600}
              hoverColor={colors.grey700}
              rippleColor={colors.yellow500}
              labelStyle={createWorkoutBtnLabelStyle}
              style={createWorkoutBtnStyle}
              onClick={this.props.handleFormSubmit}
            />
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
  handleExpand: PropTypes.func.isRequired,
  handleSwapOrder: PropTypes.func.isRequired,
  handleDeleteExercise: PropTypes.func.isRequired,
  handleMakePrivateCheck: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired
};

export default CreateWorkout;