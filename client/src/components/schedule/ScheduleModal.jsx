import React, {Component} from 'react';

class ScheduleModal extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className="scheduleModal">
      {console.log(this.props)}
        {this.props.scheduleModalVisible ? 
          <div className="modal-workout">
            <div className="scheduleModalContent">
            
            </div>

          </div>
          : 
          null
        }
      </div>
    );
  }
}

export default ScheduleModal;