import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import CreateWorkoutContainer from '../../containers/CreateWorkoutContainer.jsx';
import * as colors from "material-ui/styles/colors";

const listStyle = {
  standard: {
    backgroundColor: colors.grey300
  },
  active: {
    backgroundColor: colors.grey600
  }
};

class WorkoutsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeListItem: 0
    };
    this.handleListItemSelect = this.handleListItemSelect.bind(this)
  }

  handleListItemSelect(e) {
    this.setState({
      activeListItem: parseInt(e.currentTarget.getAttribute('data'))
    });
  }

  renderContent() {
    return this.state.activeListItem === 0 ? (
      <h1>INSERT VIEW WORKOUTS COMPONENT</h1>
    ) : (
      <CreateWorkoutContainer user_id={this.props.user_id} />
    );
  }

  render() {
    const itemStatus = Array(2).fill('').map((v, i) => this.state.activeListItem === i ? 'active' : 'standard');

    return (
      <Fragment>
        {this.renderContent()}
        <div className="workouts-list-div">
          <List className="workouts-list-select">
            <ListItem primaryText="View Workouts" style={listStyle[itemStatus[0]]} onClick={this.handleListItemSelect} data="0" disableTouchRipple={true}/>
            <ListItem primaryText="Create Workout" style={listStyle[itemStatus[1]]} onClick={this.handleListItemSelect} data="1" disableTouchRipple={true}/>
          </List>
        </div>
      </Fragment>

    )
  }
}

WorkoutsTab.propTypes = {
  user_id: PropTypes.number.isRequired
};

export default WorkoutsTab;