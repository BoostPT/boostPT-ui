import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import PublicWorkoutsListItem from './publicWorkoutsListItem.jsx';

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
              return <PublicWorkoutsListItem 
                      key={publicWorkout.id} 
                      workout={publicWorkout}
                      getEachExerciseCount={this.props.getEachExerciseCount}
                      handleWorkoutClick={this.props.handleWorkoutClick}
                      showTrashCan={this.props.showTrashCan}
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