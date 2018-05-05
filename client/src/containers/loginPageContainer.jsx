import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import LoginPage from '../components/loginPage.jsx';
import { loginUser } from '../actions/index.js';
import authReducer from '../reducers/authReducer';

class LoginPageContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      showError: false
    };
  }

  onChangeText(e){
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  async handleLoginButton(){

    const payload = {
      email: this.state.email,
      password: this.state.password
    };

    try {
        await this.props.loginUser(payload);
        // this.setState({
        //   showError: true
        // });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    return (
      <LoginPage handleLoginButton={this.handleLoginButton.bind(this)} onChangeText={this.onChangeText.bind(this)}/>

    );
  }
}

export default connect(null, {loginUser,})(LoginPageContainer);