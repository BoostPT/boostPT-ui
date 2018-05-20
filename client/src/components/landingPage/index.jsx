import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import * as colors from 'material-ui/styles/colors';

const authBtnLabelStyle = {
  fontFamily: 'Lato',
  fontSize: '1.2em',
  textTransform: 'none'
};

const authBtnStyle = {
  height: '2.4em',
  width: '6.4em',
  margin: '1.2em'
};

class LandingPage extends Component {
  render() {
    return (
      <div id="landing-page">
        <h2 id="boostpt-title">Boost<span id="pt-title">PT</span></h2>
        <div className="auth-btns">
          <Link to="/signup">
            <FlatButton
              label="Sign Up"
              backgroundColor={colors.grey600}
              hoverColor={colors.grey700}
              rippleColor={colors.yellow500}
              labelStyle={authBtnLabelStyle}
              style={authBtnStyle}
            />
          </Link>
          <Link to='/login'>
            <FlatButton
              label="Log In"
              backgroundColor={colors.grey600}
              hoverColor={colors.grey700}
              rippleColor={colors.yellow500}
              labelStyle={authBtnLabelStyle}
              style={authBtnStyle}
            />
          </Link>
        </div>
      </div>
    )
  }
}


export default LandingPage;