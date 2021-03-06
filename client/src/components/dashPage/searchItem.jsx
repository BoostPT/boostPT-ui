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
  paddingBottom: 10
};

class SearchItem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className="search-item">
        {
            <ListItem
             style={listItemStyles}
             disabled={true}
             data-id={this.props.id}
             leftAvatar={<Avatar size={25} style={avatarStyles} data-id={this.props.id}>{this.props.username.slice(0,1)}</Avatar>}
            >
             <p className="dropdown-name" data-id={this.props.id}>{this.props.username}</p>
            </ListItem>
        }
      </div>
    );
  }
}

export default SearchItem;