import React, { Component } from 'react';
import Navbar from './navbar.jsx';

class DashPage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <Navbar user={this.props.user}/>
        <h2> dash page </h2>
      </div>
    );
  }
}

export default DashPage;