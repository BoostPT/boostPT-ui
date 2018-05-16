import React, { Component } from 'react';

class SearchItem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
          <a>{this.props.trainer.username}</a>
      </div>
    );
  }
}

export default SearchItem;