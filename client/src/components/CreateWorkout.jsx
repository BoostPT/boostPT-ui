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

const addExerciseStyle = {
  marginTop: '20px',
  marginLeft: '20px'
};

const saveWorkoutStyle = {
  marginTop: '8px',
  marginBottom: '20px'
};

class CreateWorkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper id="create-workout" zDepth={2}>
        <h2 className="create-workout-header">Create Workout</h2>
        <br />
        <TextField className="create-wo-input" hintText="Workout name (optional)" underlineShow={false} />
        <Divider />
        <div className="add-exercise-menu">
          <IconMenu
            // iconButtonElement={<IconButton><AddButton style={addButtonStyle}>Add Exercise</AddButton></IconButton>}
            iconButtonElement={<FloatingActionButton backgroundColor="grey" style={addExerciseStyle} mini={true}><ContentAdd /></FloatingActionButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem primaryText="Warm-up" />
            <MenuItem primaryText="Strength" />
            <MenuItem primaryText="Cardio" />
            <MenuItem primaryText="Stretch" />
          </IconMenu>
        </div>

        <br />
        <div id="submit-wo-div">
          <Checkbox label="Make Private" />
          <RaisedButton backgroundColor="grey" label="Save Workout" labelColor="#FFEB3B" style={saveWorkoutStyle} />
        </div>

      </Paper>
    )
  }
}

export default CreateWorkout;