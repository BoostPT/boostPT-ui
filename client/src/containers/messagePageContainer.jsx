import React, { Component } from 'react';
import { connect } from 'react-redux';
import { channelList } from '../actions/index.js';
import MessagePage from '../components/messagePage/index.jsx'

class MessagePageContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.fetchChannelsFromStore();
  }

  async fetchChannelsFromStore() {
    const payload = this.props.userInfo.username;
    try {
      await this.props.channelList(payload);
    } catch (err) {
      return (err);
    }
  }

  render() {
    return (
      <div>{
        this.props.channels ?
        <div>
          <MessagePage fetchChannelsFromStore = {this.fetchChannelsFromStore.bind(this)} channels={this.props.channels} user={this.props.userInfo}/>
        </div>
        :
        <div>
        Loading...
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.user,
    channels: state.channels.channelList
  };
}

export default connect(mapStateToProps, {channelList}) (MessagePageContainer);