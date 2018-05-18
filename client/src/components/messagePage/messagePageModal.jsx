import React, { Component } from 'react';
import axios from 'axios';

class MessagePageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue : ''
    }
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this)
  };

  handleInputValueChange(e) {
    this.setState({inputValue: e.target.value});
    console.log(this.state.inputValue);
  }

  handleSubmitButtonClick() {
    this.props.toggleModal(this.state.inputValue);
    let newUser = this.state.inputValue;
    let activeUser = this.props.activeUser;
    let tempArr = [newUser, activeUser];
    let newArr = tempArr.sort();
    let channelStr = tempArr[0] + ':' + tempArr[1];
    let payload = {channelStr: channelStr}
    axios.post('http://localhost:8000/api/messages/getchannels/addchannel', payload)
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
                <input id="messageModal-input" value ={this.state.inputValue} name="unregUserInput" onChange={this.handleInputValueChange}></input>
                <button id="createChannelButton" onClick={this.handleSubmitButtonClick} >Submit</button>
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