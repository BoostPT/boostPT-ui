import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  componentDidMount() {
    if (this.props.user) {
      this.props.history.push('/dash');
    }
  }

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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
};

export default connect(mapStateToProps, null)(LandingPage);