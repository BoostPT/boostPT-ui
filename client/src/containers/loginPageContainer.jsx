import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginPage from '../components/loginPage.jsx';
import { loginUser } from '../actions/index.js';

class LoginPageContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      showError: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  onChangeText(e){
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  async handleLogin(e){
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password
    };

    try {
        const result = await this.props.loginUser(payload);
        this.setState({showError: false});
        result ? this.props.history.push('/dash') :
          this.props.history.push('/login');

    } catch (err) {
      this.setState({showError: true, email: '', password: ''});
      return (err);
    }
  }

  render() {
    return (
      <div>
        <LoginPage handleLogin={this.handleLogin} onChangeText={this.onChangeText.bind(this)} email={this.state.email} password={this.state.password}/>
        {this.state.showError ?
          <div className="errorMessage">Invalid inputs</div>
          : 
          null
        }
      </div>
    );
  }
}



export default connect(null, { loginUser })(LoginPageContainer);