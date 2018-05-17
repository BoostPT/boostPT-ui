import React, { Component } from 'react';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

const avatarStyles = {
  marginLeft: -10,
  marginTop: -2,
  zIndex: -10
};

const listItemStyles = {
  zIndex: 10
};

class SearchItem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        {
          this.props.picture ?
            <img data-id={this.props.userId} src={require(`${this.props.picture}`)} />
            :
            <ListItem
             style={listItemStyles}
             disabled={true}
             leftAvatar={<Avatar size={25} style={avatarStyles} data-id={this.props.userId}>{this.props.trainer.username.slice(0,1)}</Avatar>}
            >
             <p className="dropdown-item" data-id={this.props.userId}>{this.props.trainer.username}</p>
            </ListItem>
        }
      </div>
    );
  }
}

export default SearchItem;