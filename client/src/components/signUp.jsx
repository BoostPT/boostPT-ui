import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
        toggle: { marginBottom: 16 }
    };

    return (
      <div>
        <h1>Sign Up</h1>
        <div>
          <TextField name="email" floatingLabelText="Email" onChange={this.props.handleChange}/><br/>
          <TextField name="password" hintText="" floatingLabelText="Password" onChange={this.props.handleChange}/><br/>
          <TextField name="username" hintText="" floatingLabelText="Display Name" onChange={this.props.handleChange}/>
        </div>
        <div>
          <Toggle 
          label="I'm a trainer"
          labelPosition="right"
          style={styles.toggle}
          onToggle={(e, isChecked) => this.props.handleToggleButtonChange(isChecked)}
          onClick={this.props.handleToggleButtonChange}
          />
          <RaisedButton label="Sign Up" primary={true} onClick={this.props.handleSignupClick}/>
        </div>
      </div>
    );
  }
}


export default Signup;