import React, { Component } from 'react';
import axios from 'axios';

class MessagePageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue : '',
      toggleFailureMessage: false,
      toggleExistsMessage: false
    }
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.overlayClick = this.overlayClick.bind(this);
  };

  handleInputValueChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmitButtonClick();
    }
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this)
  };

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  escFunction(e) {
    if (e.keyCode === 27) {
      this.props.toggleAddChatModal();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  overlayClick(e) {
    if (e.target.className === 'messageModal') {
      this.props.toggleAddChatModal();
    }
  }

  async handleSubmitButtonClick() {
    let newUser = this.state.inputValue;
    let activeUser = this.props.activeUser;
    let tempArr = [newUser, activeUser];
    let newArr = tempArr.sort();
    let channelStr = tempArr[0] + ':' + tempArr[1];
    let payload = {channelStr: channelStr, newUser: newUser}
    try {
      const result = await axios.post('http://localhost:8000/api/messages/getchannels/addchannel', payload, {
        headers: {
          Authorization: `${document.cookie}`
        }
      });
      if (result.status === 200) {
        this.props.toggleAddChatModal(this.state.inputValue);
        return ('success');
      } else if (result.status === 205) {
        this.setState({toggleExistsMessage: true, toggleFailureMessage: false});
      } else {
        this.setState({toggleFailureMessage: true, toggleExistsMessage: false});
      }
    } catch (err) {
      console.log(err);
      return (err);
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmitButtonClick();
    }
  }

  render() {
    return (
      <div>{
        <div className="messageModal" onClick={this.overlayClick}>
          <div className="messageModal-content" >
            <div id="messageModal-title">Start a New Channel</div>
            <div id="messagetModal-subtitle" >Enter a username here
            </div>
            <label>
              <span>
                <input id="messageModal-input" value ={this.state.inputValue} name="channelInput" onChange={this.handleInputValueChange} onKeyPress={(e) => this.handleKeyPress(e)}></input>
                <button id="createChannelButton" onClick={this.handleSubmitButtonClick} >Submit</button>
              </span>
            </label>
            {
              this.state.toggleFailureMessage === true ?
              <div>User does not exist</div>
              : 
              <span></span>
            }
            <div>
            {
              this.state.toggleExistsMessage === true ? 
              <div>Channel already exists</div>
              :
              <span></span>
            }
            </div>
            <div>
              <span className="close" onClick={this.props.toggleAddChatModal}>&times;</span>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default MessagePageModal;