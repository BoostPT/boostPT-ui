import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as colors from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MessagePageModal from './messagePageModal.jsx'

class MessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleModal: false,
      channelNameList: []
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChannelButtonClick = this.handleChannelButtonClick.bind(this);
  }

  componentWillMount() {
    let channels = this.props.channels;
    let username = this.props.user.username;
    console.log(this.props.channels, 'CHANNELLIST ON MESSAGEPAGE');
    console.log(this.props.user.username);
    var tempArr = [];
    for (var i = 0; i < channels.length; i++) {
      var str = channels[i].participants.replace("Jake", "").replace(":", "");
      tempArr.push(str);
    }
    console.log(tempArr, 'TEMPARR');
    this.setState({channelNameList: tempArr});
    //get name from each channel that isn't yours, and add to channelnamelist
  }

  toggleModal() {
    if (this.state.toggleModal === true) {
      this.setState({toggleModal: false});
    } else {
      this.setState({toggleModal: true});
    }
  }

  handleChannelButtonClick() {
    console.log('click!');
    this.setState({toggleModal: true});
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
            {
              this.state.channelNameList.map(value => 
                <div className="channelName">
                  <div className="overlay">
                  {value}
                  </div>
                </div>
              )
            }       
          </div>
        </div>
        <div id="right-top">
          <div id="right-top-header">
          Direct Message with Darren
          </div>
        </div>
        <div id="right-middle">
          <div id="message">
            <span id="name">
              Jake
            </span>
            <span>
              Hello World!
            </span>
          </div>
          <div id="messagetwo">
            <span id="name">
              Darren
            </span>
            <span>
              Hey Man
            </span>
          </div>
          <div id="message">
            <span id="name">
              Jake
            </span>
            <span>
              What's up?
            </span>
          </div>
          <div id="messagetwo">
            <span id="name">
              Darren
            </span>
            <span>
              Not much just chillin
            </span>
          </div>
          <div id="message">
            <span id="name">
              Jake
            </span>
            <span>
              That's Chill
            </span>
          </div>
          <div id="messagetwo">
            <span id="name">
              Darren
            </span>
            <span>
              I love pancakes
            </span>
          </div>
          <div id="message">
            <span id="name">
              Jake
            </span>
            <span>
              What?
            </span>
          </div>
        </div>
        <div id="right-bottom">
        hello there
        </div>
        <div>
          {this.state.toggleModal ?
          <MessagePageModal toggleModal={this.toggleModal.bind(this)}/>
          :
          <div>
          </div>}
        </div>
      </div>
    )
  }
}

export default MessagePage;