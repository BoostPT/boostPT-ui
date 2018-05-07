import React, { Component } from 'react';
import PropTypes from "prop-types";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class LoginPage extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <h2>LOGIN PAGE</h2>
        <TextField 
          name='email' 
          floatingLabelText='Username' 
          onChange={this.props.onChangeText}
          value={this.props.email}
        />
        <TextField 
          name='password' 
          floatingLabelText='Password' 
          onChange={this.props.onChangeText}
          value={this.props.password}
        />
        <FlatButton label="Login" onClick={this.props.handleLoginButton}/>
      </div>
    );  
  }
}

export default LoginPage;