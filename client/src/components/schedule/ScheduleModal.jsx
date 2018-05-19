import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';

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
            <IconButton
              // onClick={this.props.toggleModal()}
            >
              <Clear/>
            </IconButton>
            
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