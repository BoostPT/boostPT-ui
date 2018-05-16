import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginPage from '../components/auth/loginPage.jsx';
import { authUser } from '../actions/index.js';
import axios from "axios/index";

class LoginPageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  onChangeText(e){
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  async handleLogin(e) {
    e.preventDefault();
    const loginPayload = {
      email: this.state.email,
      password: this.state.password
    };
    try {
      const result = await axios.post('http://localhost:8000/api/auth/login', loginPayload);
      this.props.authUser(result.data);
      document.cookie = `jwt=${result.headers.jwt}`;
      this.props.history.push('/dash');
    }
    catch(err) {
      this.setState({
        email: '',
        password: '',
        errorMessage: 'Invalid email/password combination'
      });
    }
  }

  render() {
    return (
      <LoginPage
        handleLogin={this.handleLogin}
        onChangeText={this.onChangeText.bind(this)}
        email={this.state.email}
        password={this.state.password}
        errorMessage={this.state.errorMessage}
      />
    );
  }
}

export default connect(null, { authUser })(LoginPageContainer);