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
        const result = await this.props.loginUser(payload);
        console.log("past the post");
        this.setState({showError: false});
        result ? this.props.history.push('/dash') : 
          this.props.history.push('/login');
        
    } catch (err) {
      this.setState({showError: true, email: '', password: ''});
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <LoginPage handleLoginButton={this.handleLoginButton.bind(this)} onChangeText={this.onChangeText.bind(this)} email={this.state.email} password={this.state.password}/>
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