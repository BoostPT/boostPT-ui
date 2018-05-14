import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginPage from '../components/auth/loginPage.jsx';
import { authUser } from '../actions/index.js';

class LoginPageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  onChangeText(e){
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.authUser(this.state, 'login');
    this.setState({
      email: '',
      password: ''
    });
  }

  render() {
    return (
      <LoginPage
        handleLogin={this.handleLogin}
        onChangeText={this.onChangeText.bind(this)}
        email={this.state.email}
        password={this.state.password}
        errorMessage={this.props.error}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { error: state.auth.error };
};

export default connect(mapStateToProps, { authUser })(LoginPageContainer);