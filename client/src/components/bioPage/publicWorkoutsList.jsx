import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import WorkoutsListItem from '../workoutsView/workoutsListItem.jsx';
// import { blueGrey800 } from 'material-ui/styles/colors';

const style = {
  height: 550,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: '#EEEEEE',
  borderRadius: 7,
  position: 'relative'
};

class PublicWorkoutsList extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="publicWorkoutsContainer">
        <div className="publicWorkoutTitle"> My Public Workouts: </div>
        <Paper 
          className="publicWorkouts"
          style={style}
          zDepth={1}
          children={
            Array.isArray(this.props.publicWorkouts) ? this.props.publicWorkouts.map(publicWorkout => {
              return <WorkoutsListItem 
                      key={publicWorkout.id} 
                      workout={publicWorkout}
                      getEachExerciseCount={this.props.getEachExerciseCount}
                      handleExerciseClick={this.props.handleExerciseClick}
                      />
            })
            : 
            null 
          }
        />
      </div>
    );
  }
}

export default PublicWorkoutsList;