import React, { Component } from 'react';
import PropTypes from "prop-types";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
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

const toggleStyle = {
  thumb: {
    backgroundColor: colors.yellow700
  },
  track: {
    backgroundColor: colors.yellow300
  }
};

const toggleLabelStyle = {
  color: '#49525d',
  fontFamily: 'Lato'
};

const renderTextField = (name, hintText, type, onChange) => {
  return (
    <TextField
      name={name}
      hintText={hintText}
      type={type}
      onChange={onChange}
      underlineFocusStyle={{ borderColor: colors.yellow500 }}
    />
  )
};

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='auth-page'>
        <Paper className="signup-outer" zDepth={3}>
          <div className="auth-inner">
            <h2>Sign Up</h2>
            <form className="auth-form">
              {renderTextField('username', 'Username', 'text', this.props.handleChange)}
              <br />
              {renderTextField('email', 'Email', 'text', this.props.handleChange)}
              <br/>
              {renderTextField('password', 'Password', 'password', this.props.handleChange)}
              <div className="signup-submit-div">
                <Toggle
                  label="I'm a trainer"
                  defaultToggled={true}
                  labelPosition="right"
                  thumbSwitchedStyle={toggleStyle.thumb}
                  trackSwitchedStyle={toggleStyle.track}
                  labelStyle={toggleLabelStyle}
                  onClick={this.props.handleToggleButtonChange}
                  // onToggle={(e, isChecked) => this.props.handleToggleButtonChange(isChecked)}
                />
                <FlatButton
                  label="Sign Up"
                  backgroundColor={colors.grey600}
                  hoverColor={colors.grey700}
                  rippleColor={colors.yellow500}
                  labelStyle={authBtnLabelStyle}
                  style={authBtnStyle}
                  onClick={this.props.handleSignupClick}
                />
              </div>
            </form>
            {this.props.errorMessage ?
              <div className="error-message">{this.props.errorMessage}</div>
              :
              null
            }
          </div>
        </Paper>
      </div>
    );
  }
}

Signup.propTypes = {
  handleSignupClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleToggleButtonChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default Signup;