import React, {Component} from 'react';
import WorkoutsListContainer from '../../../containers/workoutsListContainer.jsx';
import WorkoutItemContainer from '../../../containers/workoutItemContainer.jsx';

class PublicWorkouts extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="myPublicWorkouts">
        <WorkoutsListContainer user={this.props.user} isPublic={true} publicWorkouts={this.props.publicWorkouts} />
        <WorkoutItemContainer/>
      </div>
    );
  }
}

export default PublicWorkouts;