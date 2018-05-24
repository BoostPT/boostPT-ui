import React, { Component } from 'react';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

const avatarStyles = {
  marginLeft: -10,
  marginBottom: -5,
  zIndex: -10,
  float: 'left'
};

const listItemStyles = {
  zIndex: 10,
  paddingBottom: 10,
};

class RequestListItem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className="dropdown-item">
        <ListItem
          style={listItemStyles}
          disabled={true}
          data-id={this.props.id}
          leftAvatar={<Avatar size={25} style={avatarStyles} data-id={this.props.id}>{this.props.username.slice(0,1)}</Avatar>}
        >
        <p className="dropdown-name" data-id={this.props.id}>{this.props.username}</p>
        <button className="request-accept request-option" onClick={this.props.handleRequestOptionYesClick} data-id={this.props.id}>Accept</button>
        <button className="request-deny request-option" onClick={this.props.handleRequestOptionNoClick} data-id={this.props.id}>Deny</button>
        </ListItem>
      </div>
    );
  }
}

export default RequestListItem;