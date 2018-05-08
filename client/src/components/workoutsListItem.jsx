import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

class WorkoutsListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="border font">
        <div className="pos-abs full-width">
          <h5 className="title float-left font-title">My Workout #1</h5>
          <p className="created float-right">created yesterday</p>
          <div className="clear-float"></div>
        </div>
        <div className="pad-top">
          <p className="exercises">Exercises</p>
          <p className="float-left pad">1 Warm-up<img className="shift-icon-down" src={require('../../dist/images/fire.png')} alt="stretching icon"></img></p>
          <p className="float-left pad">1 Cardio<img className="shift-icon-down" src={require('../../dist/images/running.png')} alt="stretching icon"></img></p>
          <div className="clear-float"></div>
          <p className="float-left pad">8 Strength<img className="shift-icon-down" src={require('../../dist/images/weight.png')} alt="stretching icon"></img></p>
          <p className="float-left add-left-pad">3 Stretch<img className="shift-icon-down" src={require('../../dist/images/stretch.png')} alt="stretching icon"></img></p>
          <img className="float-right status" src={require('../../dist/images/earth.png')} alt="stretching icon"></img>
          <div className="clear-float"></div>
        </div>
      </div>
    );
  }
}
{/* <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}
export default WorkoutsListItem;