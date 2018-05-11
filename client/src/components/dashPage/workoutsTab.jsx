import React, { Component } from 'react';

import CreateWorkoutContainer from '../../containers/CreateWorkoutContainer.jsx';

class WorkoutsTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CreateWorkoutContainer user_id={this.props.user_id} />
    )
  }
}

export default WorkoutsTab;