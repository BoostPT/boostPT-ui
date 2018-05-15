import React, {Component} from 'react';
import PublicWorkoutsListContainer from '../../containers/publicWorkoutsListContainer.jsx';
import WorkoutItemContainer from '../../containers/workoutItemContainer.jsx';

class PublicWorkouts extends Component{
  constructor(props){
    super(props);
  }


  render(){
    return(
      <div>
        <PublicWorkoutsListContainer user={this.props.user}/>
        <WorkoutItemContainer/>
      </div>
    );
  }
}

export default PublicWorkouts;