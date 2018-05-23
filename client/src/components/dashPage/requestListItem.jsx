import React, { Component } from 'react';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

const avatarStyles = {
  marginLeft: -10,
  marginTop: -5,
  marginBottom: -5,
  zIndex: -10
};

const listItemStyles = {
  zIndex: 10,
  paddingBottom: 10,
  float: 'left'
};

class RequestListItem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className="dropdown-item">
        {
          this.props.picture ?
            <img className="avatar-styles" data-id={this.props.id} src={require(`${this.props.picture}`)} />
            :
            <ListItem
             style={listItemStyles}
             disabled={true}
             data-id={this.props.id}
             leftAvatar={<Avatar size={25} style={avatarStyles} data-id={this.props.id}>{this.props.username.slice(0,1)}</Avatar>}
            >
            <p className="dropdown-name" data-id={this.props.id}>{this.props.username}</p>
            <button onClick={this.props.handleRequestOptionYesClick} data-id={this.props.id}>Accept</button>
            <button onClick={this.props.handleRequestOptionNoClick} data-id={this.props.id}>Deny</button>
            </ListItem>
        }
      </div>
    );
  }
}

export default RequestListItem;