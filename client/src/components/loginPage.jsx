import React, { Component } from 'react';
import PropTypes from "prop-types";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as colors from "material-ui/styles/colors";

const formUnderlineFocusStyle = {
  borderColor: colors.yellow500
};

class LoginPage extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Paper id="login-outer" zDepth={3}>
        <div id="login-inner">
          <h2>Sign In</h2>
          <form id="login-form">
            <TextField
              name='email'
              hintText='Email'
              onChange={this.props.onChangeText}
              value={this.props.email}
              underlineFocusStyle={formUnderlineFocusStyle}
            />
            <br />
            <TextField
              name='password'
              hintText='Password'
              type="password"
              onChange={this.props.onChangeText}
              value={this.props.password}
              underlineFocusStyle={formUnderlineFocusStyle}
            />
            <br />
            <FlatButton type="submit" label="Login" onClick={this.props.handleLogin}/>
          </form>
        </div>
      </Paper>
    );  
  }
}

LoginPage.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginPage;