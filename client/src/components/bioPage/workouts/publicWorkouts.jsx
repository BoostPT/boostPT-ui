import React, {Component} from 'react';
import PublicWorkoutsListContainer from '../../../containers/bioPage/publicWorkoutsListContainer.jsx';
import PublicWorkoutItemContainer from '../../../containers/bioPage/publicWorkoutItemContainer.jsx';

class PublicWorkouts extends Component{
  constructor(props){
    super(props);
  }


  render(){
    return(
      <div className="myPublicWorkouts">
        <PublicWorkoutsListContainer user={this.props.user}/>
        <PublicWorkoutItemContainer/>
      </div>
    );
  }
}

export default PublicWorkouts;