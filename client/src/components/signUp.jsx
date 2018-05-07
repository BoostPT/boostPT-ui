import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from "material-ui/styles/colors";

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

const styles = {
    toggle: { marginBottom: 16 }
};

const styles = {
    toggle: { marginBottom: 16 }
};

const styles = {
    toggle: { marginBottom: 16 }
};

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
                labelPosition="right"
                onToggle={(e, isChecked) => this.props.handleToggleButtonChange(isChecked)}
                onClick={this.props.handleToggleButtonChange}
              />
              <RaisedButton
                label="Sign Up"
                primary={true}
                onClick={this.props.handleSignupClick}
              />
            </div>
          </form>
        </div>
      </Paper>
    );
  }
}

Signup.propTypes = {
  handleSignupClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleToggleButtonChange: PropTypes.func.isRequired
};

export default Signup;