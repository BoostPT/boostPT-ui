import React, { Component } from 'react';
import { connect } from 'react-redux';
import Signup from '../components/auth/signUp.jsx';
import { authUser } from '../actions/index.js';
import axios from 'axios';

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        email: '',
        password: '',
        isTrainer: false,
        errorMessage: ''
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

  async handleSignupClick(e) {
    e.preventDefault();
    const userPayload = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      isTrainer: this.state.isTrainer
    };
    try {
      const result = await axios.post('http://localhost:8000/api/auth/signup', userPayload);
      this.props.authUser(result.data);
      document.cookie = `jwt=${result.headers.jwt}`;
      this.props.history.push('/dash');
    }
    catch(err) {
      this.setState({
        username: '',
        email: '',
        password: '',
        errorMessage: 'Invalid input'
      });
    }
  }

  render() {
    return (
      <Signup
        handleSignupClick={this.handleSignupClick}
        handleChange={this.handleChange}
        handleToggleButtonChange={this.handleToggleButtonChange}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}

export default connect(null, { authUser })(SignupContainer);