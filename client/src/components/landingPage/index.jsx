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
        <br />
        <h3 className="landing-page-header">Personal Training Client Management, Simplified</h3>
        <div className="landing-page-subheader">
          <h3 className="landing-page-col">Schedule Workouts</h3>
          <h3 className="landing-page-col">Log Exercises</h3>
          <h3 className="landing-page-col">Share with your network</h3>
        </div>
        <span className="footer">Copyright &copy; 2018 BoostPT. All Rights Reserved.</span>
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