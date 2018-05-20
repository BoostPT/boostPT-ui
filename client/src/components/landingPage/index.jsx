import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import CalendarIcon from 'material-ui/svg-icons/action/date-range';
import Bullets from 'material-ui/svg-icons/editor/format-list-bulleted';
import DashIcon from 'material-ui/svg-icons/action/dashboard';
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

const iconStyle = {
  width: '6em',
  height: '6em',
  color: '#49525d',
  opacity: 0.65
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
          <div className="landing-page-col-grid">
            <div className="landing-page-col">
              <h3>Schedule Workouts</h3>
              <CalendarIcon className="landing-page-icon" style={iconStyle} />
              <p className="landing-page-txt"></p>
            </div>
            <div className="landing-page-col">
              <h3>Log Exercises</h3>
              <Bullets className="landing-page-icon" style={iconStyle} />
            </div>
            <div className="landing-page-col">
              <h3>Organize Client Programs</h3>
              <DashIcon className="landing-page-icon" style={iconStyle} />
            </div>
          </div>
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