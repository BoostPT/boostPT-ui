import React, {Component} from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        Email: <input></input><br/>
        Password: <input type="password"></input><br/>
        <button>Sign Up</button>
      </div>
    );
  }
}

export default Signup;