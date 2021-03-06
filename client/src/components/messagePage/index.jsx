import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import * as colors from 'material-ui/styles/colors';
import MessagePageModal from './messagePageModal.jsx';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/fontawesome-free-solid';
import { faAngleDoubleRight } from '@fortawesome/fontawesome-free-solid';
import debounce from 'lodash/debounce';
import io from 'socket.io-client';
import shortid from 'shortid';

class MessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAddChatModal: false,
      channelNameList: [],
      activeChannel: '',
      messageInput: '',
      messages: [],
      hideSidebar: false,
      doubleLeft: false,
    };
    this.animateSidebar = this.animateSidebar.bind(this);
    this.toggleAddChatModal = this.toggleAddChatModal.bind(this);
    this.handleAddChatButton = this.handleAddChatButton.bind(this);
    this.handleChannelNameClick = this.handleChannelNameClick.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.flipArrow = debounce(this.flipArrow.bind(this), 1000);
    this.socket = io('http://localhost:5000');
  }

  componentWillMount() {
    this.props.fetchChannelsFromStore();
    let channels = this.props.channels;
    let username = this.props.user.username;
    let tempArr = [];
    for (let i = 0; i < channels.length; i++) {
      let str = channels[i].participants.replace(username, "").replace(":", "");
      tempArr.push(str);
    }
    this.setState({channelNameList: tempArr});
  }

  componentDidMount() {
    this.socket.on('message', (data) => {
      let tempArr = this.state.messages;
      tempArr.push({user: data.user, text: data.message});
      this.setState({messages: tempArr});
     });
  }

  toggleAddChatModal(channel) {
    if (this.state.toggleAddChatModal === true) {
      if (typeof channel === 'string') {
        let tempChannelArr = this.state.channelNameList;
        tempChannelArr.unshift(channel);
        this.setState({toggleAddChatModal: false, channel: channel})
      } else {
        this.setState({toggleAddChatModal: false});
      }
    } else {
      this.setState({toggleAddChatModal: true});
    }
  }

  handleAddChatButton() {
    this.setState({toggleAddChatModal: true});
  }

  handleChannelNameClick(channelName) {
    this.props.fetchChannelsFromStore();
    let tempArr = [channelName, this.props.user.username];
    let newArr = tempArr.sort();
    var channelStr = newArr[0] + ':' + newArr[1];
    if (this.state.activeChannel.length > 0) {
      this.socket.emit('unsubscribe', this.state.activeChannel);
    }
    this.socket.emit('subscribe', channelStr);
    let channels = this.props.channels;
    let tempMessagesArr = [];
    for (let i = 0; i < channels.length; i++) {
      if (channels[i].participants.includes(channelName)) {
        let messages = channels[i].messages;
        for (let j = 0; j < messages.length; j++) {
          tempMessagesArr.push({user: messages[j].user, text: messages[j].text});
        }
      }
    }
    this.setState({activeChannel: channelStr, messages: tempMessagesArr});
    this.props.fetchChannelsFromStore();
  }

  handleMessageInput(e) {
    this.setState({messageInput: e.target.value});
  }

  sendMessage() {
    this.socket.emit('send', {room: this.state.activeChannel, message: this.state.messageInput, user: this.props.user.username});
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
      this.setState({messageInput: ''});
    }
  }

  animateSidebar() {
    this.state.hideSidebar === false ? this.setState({hideSidebar: true}) : (this.setState({hideSidebar: false}));
    this.flipArrow();
  }

  flipArrow() {
    this.state.doubleLeft ? this.setState({doubleLeft: false}) : this.setState({doubleLeft: true});
  }
  
  render() {
    return (
      <div className="messageView">
        <div id="left" className={this.state.hideSidebar? "animateWidth" : "staticWidth"}>
          <div id="left-header-container">
            <div id="left-header">
              Messages
            </div>
            <div style={{overflow: 'hidden', textAlign: 'center'}}>
            <FlatButton className="chatButton"
                            onClick={this.handleAddChatButton} 
                            backgroundColor={colors.grey600}
                            rippleColor={colors.yellow500}
                            hoverColor={colors.grey700}
                            labelStyle={{ fontFamily: 'Lato', color: '#EEE',
                            fontSize: '1.4em', textTransform: 'none'}}
                            style={{marginTop: '0.8em'}}
                            labelStyle={{fontSize: '20px', textTransform: 'none', overflowX: 'hidden', color: '#EEE'}}
                            label="Add Chat"/>
            </div>
            <div className="channelScrollBox">
            {
              this.state.channelNameList.map(channelName =>    
                <div key={shortid.generate()} className="channelName" onClick={() => {this.handleChannelNameClick.call(null, channelName)}}>
                  <div className="overlay">
                  {channelName}
                  </div>
                </div> 
              )
            }  
            </div>     
          </div>
        </div>
        <div id="right-top">
        <FontAwesomeIcon onClick={this.animateSidebar} className={"doubleArrow"} icon={this.state.doubleLeft ? faAngleDoubleRight : faAngleDoubleLeft} />
          <div id="right-top-header">
          {
            this.state.activeChannel.length > 0 ?
            <div>
              {this.state.activeChannel.replace(this.props.user.username, "").replace(":", "")}
            </div>
            :
            <div>
              No Channel Selected
            </div>
          }
          </div>
        </div>
        <div id="right-middle">
          {
            this.state.messages.map(value => 
              <div key={shortid.generate()} id={'messageother'}>
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
            <input id="messageInput" type="text" value={this.state.messageInput} onChange={this.handleMessageInput} onKeyPress={(e) => this.handleKeyPress(e)}/>
            <div>
              <FlatButton className="sendButton"
                            onClick={this.sendMessage} 
                            backgroundColor={colors.grey600}
                            hoverColor={colors.grey700}
                            rippleColor={colors.yellow500}
                            style={{ float: 'left', marginLeft: '10px', marginTop: '1.8em'}}
                            labelStyle={{fontSize: '20px', textTransform: 'none', color: '#EEE'}}
                            label="Send"/>
            </div>
          </label>
        </div>
        </div>
        <div>
          {this.state.toggleAddChatModal ?
          <MessagePageModal fetchChannelsFromStore = {this.fetchChannelsFromStore} activeUser = {this.props.user.username} toggleAddChatModal={this.toggleAddChatModal.bind(this)}/>
          :
          <div>
          </div>}
        </div>
      </div>
    )
  }
}

export default MessagePage;
