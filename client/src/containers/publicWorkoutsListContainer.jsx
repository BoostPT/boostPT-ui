import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getUserPublicWorkoutsList} from '../actions/index.js';

import PublicWorkoutsList from '../components/bioPage/publicWorkoutsList.jsx';

class PublicWorkoutsListContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log("the user",this.props.user);
    this.props.getUserPublicWorkoutsList(this.props.user.id);
  }

  render(){
    return(
      <PublicWorkoutsList/>
    );
  }
}

export default connect(null, {getUserPublicWorkoutsList})(PublicWorkoutsListContainer);