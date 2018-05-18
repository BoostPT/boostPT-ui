import React, { Component } from 'react';

class MessagePageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>{
        <div className="messageModal">
          <div className="messageModal-content">
            <div id="messageModal-title" >Start a New Channel</div>
            <div id="messagetModal-subtitle" >Name
            </div>
            <label>
              <span>
                <input id="messageModal-input" name="unregUserInput" value={this.state.unregClientForm} onChange={this.handleUnregClientFormChange}></input>
                <button id="createChannelButton" >Submit</button>
              </span>
            </label>
            {
              this.state.toggleFailureMessage === true ?
              <span> Username Already Taken</span>
              : 
              <span></span>
            }
            <div>
              <span className="close" onClick={this.props.toggleModal}>&times;</span>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default MessagePageModal;