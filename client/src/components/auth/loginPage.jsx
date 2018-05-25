import React, { Component } from 'react';
import PropTypes from "prop-types";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as colors from "material-ui/styles/colors";

const authBtnLabelStyle = {
  fontFamily: 'Lato',
  fontSize: '1.2em',
  color: '#EEE',
  textTransform: 'none'
};

const authBtnStyle = {
  height: '2.4em',
  width: '6.4em',
  margin: '1.2em'
};

const renderTextField = (name, hintText, type, onChange, value) => {
  return (
    <TextField
      name={name}
      hintText={hintText}
      type={type}
      onChange={onChange}
      value={value}
      underlineFocusStyle={{ borderColor: colors.yellow500 }}
    />
  )
};

class LoginPage extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='auth-page'>
        <Paper className="login-outer" zDepth={3}>
          <div className="auth-inner">
            <h2>Sign In</h2>
            <form className="auth-form">
              {renderTextField('email', 'Email', 'text', this.props.onChangeText, this.props.email)}
              <br />
              {renderTextField('password', 'Password', 'password', this.props.onChangeText, this.props.password)}
              <br />
              <FlatButton
                type="submit"
                label="Log In"
                backgroundColor={colors.grey600}
                hoverColor={colors.grey700}
                rippleColor={colors.yellow500}
                labelStyle={authBtnLabelStyle}
                style={authBtnStyle}
                onClick={this.props.handleLogin}
              />
            </form>
          </div>
          {this.props.errorMessage ?
            <div className="error-message">Invalid inputs</div>
            :
            null
          }
        </Paper>
      </div>
    );  
  }
}

LoginPage.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default LoginPage;