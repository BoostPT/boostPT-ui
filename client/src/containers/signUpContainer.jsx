import React, { Component } from 'react';
import { connect } from 'react-redux';
import Signup from '../components/signUp.jsx';
import { signUpUser } from '../actions/index.js';
import axios from 'axios';

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        username: '',
        isTrainer: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleToggleButtonChange = this.handleToggleButtonChange.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleToggleButtonChange(isChecked) {
    this.setState({ isTrainer: isChecked });
  }

  handleSignupClick(e) {
    e.preventDefault();
    const body = Object.assign({}, this.state);
    this.props.signUpUser(body);
  }

  render() {
    return (
      <Signup 
      handleSignupClick={this.handleSignupClick}
      handleChange={this.handleChange}
      handleToggleButtonChange={this.handleToggleButtonChange}/>
    );
  }
}

export default connect(null, { signUpUser })(SignupContainer);