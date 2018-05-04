import React, { Component } from 'react';
import Signup from '../components/signUp.jsx';
import axios from 'axios';

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        displayName: '',
        isTrainer: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleToggleButtonChange = this.handleToggleButtonChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleToggleButtonChange(isChecked) {
    this.setState({ isTrainer: isChecked });
  }

  handleSignupClick() {
    // send email and password to server
    // axios.post('');
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


export default SignupContainer;