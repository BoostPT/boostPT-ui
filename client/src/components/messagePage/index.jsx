import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as colors from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MessagePageModal from './messagePageModal.jsx';
import io from 'socket.io-client';

class MessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleModal: false,
      channelNameList: [],
      activeChannel: '',
      messageInput: '',
      messages: []
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChannelButtonClick = this.handleChannelButtonClick.bind(this);
    this.handleChannelNameClick = this.handleChannelNameClick.bind(this);
    this.handleSubmitMessageButtonClick = this.handleSubmitMessageButtonClick.bind(this);
    this.handleMessageInputValueChange = this.handleMessageInputValueChange.bind(this);
    this.socket = io('http://localhost:5000');
  }

  componentWillMount() {
    let channels = this.props.channels;
    let username = this.props.user.username;
    let messages = this.props.channels.messages;
    let tempArr = [];
    for (var i = 0; i < channels.length; i++) {
      var str = channels[i].participants.replace(username, "").replace(":", "");
      tempArr.push(str);
    }
    this.setState({channelNameList: tempArr});
  }

  componentDidMount() {
    this.socket.on('message', (data) => {
      let tempArr = this.state.messages;
      tempArr.unshift({user: data.user, text: data.message});
      this.setState({messages: tempArr});
     });
  }

  toggleModal(channel) {
    if (this.state.toggleModal === true) {
      if (typeof channel === 'string') {
        var tempChannelArr = this.state.channelNameList;
        tempChannelArr.unshift(channel);
        this.setState({toggleModal: false, channel: channel})
      } else {
        this.setState({toggleModal: false});
      }
    } else {
      this.setState({toggleModal: true});
    }
  }

  handleChannelButtonClick() {
    this.setState({toggleModal: true});
  }

  handleChannelNameClick(value) {
    var channels = this.props.channels;
    var tempMessagesArr = [];
    for (var i = 0; i < channels.length; i++) {
      if (channels[i].participants.includes(value)) {
        var messages = channels[i].messages;
        for (var j = 0; j < messages.length; j++) {
          tempMessagesArr.push({user: messages[j].user, text: messages[j].text});
        }
      }
    }
    this.setState({activeChannel: value, messages: tempMessagesArr});
    this.socket.emit('subscribe', this.state.activeChannel);
  }

  handleMessageInputValueChange(e) {
    this.setState({messageInput: e.target.value});
  }

  handleSubmitMessageButtonClick() {
    this.socket.emit('send', {room: this.state.activeChannel, message: this.state.messageInput, user: this.props.user.username});
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmitMessageButtonClick();
      this.setState({messageInput: ''});
    }
  }
  
  render() {
    return (
      <div className="messageView">
        <div id="left">
          <div id="left-header-container">
            <span id="left-header">
              Messages
            </span>
            <FloatingActionButton onClick={this.handleChannelButtonClick} className="add-chat" backgroundColor={colors.grey600} mini={true}><ContentAdd /></FloatingActionButton>
            <div className="channelScrollBox">
            {
              this.state.channelNameList.map(value =>    
                <div className="channelName" onClick={() => {this.handleChannelNameClick.call(null, value)}}>
                  <div className="overlay">
                  {value}
                  </div>
                </div> 
              )
            }  
            </div>     
          </div>
        </div>
        <div id="right-top">
          <div id="right-top-header">
          {
            this.state.activeChannel.length > 0 ?
            <div>
              Direct Message with {this.state.activeChannel}
            </div>
            :
            <div>
              No Channel Currently Selected
            </div>
          }
          </div>
        </div>
        <div id="right-middle">
          {
            this.state.messages.map(value => 
              <div id="message">
                <span id="name">
                  {value.user}
                </span>
                <span>
                  {value.text}
                </span>
              </div>
            )
          }
        </div>
        <div id="right-bottom">
        <div>
          <label>
            <input id="messageInput" type="text" value={this.state.messageInput} onChange={this.handleMessageInputValueChange} onKeyPress={(e) => this.handleKeyPress(e)}/>
            <button onClick={() => {this.handleSubmitMessageButtonClick()}}>Submit</button>
          </label>
        </div>
        </div>
        <div>
          {this.state.toggleModal ?
          <MessagePageModal activeUser = {this.props.user.username} toggleModal={this.toggleModal.bind(this)}/>
          :
          <div>
          </div>}
        </div>
      </div>
    )
  }
}

export default MessagePage;