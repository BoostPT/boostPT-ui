import React, { Component } from 'react';
import { connect } from 'react-redux';
import Signup from '../components/auth/signUp.jsx';
import { authUser } from '../actions/index.js';

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        email: '',
        password: '',
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
    this.props.authUser(this.state, 'signup');
    this.setState({
      username: '',
      email: '',
      password: ''
    });
  }



  render() {
    return (
      <Signup 
      handleSignupClick={this.handleSignupClick}
      handleChange={this.handleChange}
      handleToggleButtonChange={this.handleToggleButtonChange}
      errorMessage={this.props.error}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { error: state.auth.error };
};

export default connect(mapStateToProps, { authUser })(SignupContainer);