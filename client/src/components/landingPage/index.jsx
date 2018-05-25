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
  textTransform: 'none',
  color: '#EEE'
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
        <h2 className="landing-page-header" id="landing-page-subheader">For the professional trainer, or the dedicated athlete</h2>
        <div className="landing-page-feature-list">
          <div className="landing-page-subheader-grid">
            <div className="landing-page-col">
              <h3>Schedule Workouts</h3>
              <CalendarIcon className="landing-page-icon" style={iconStyle} />
            </div>
            <div className="landing-page-col">
              <h3>Log Exercises</h3>
              <Bullets className="landing-page-icon" style={iconStyle} />
            </div>
            <div className="landing-page-col">
              <h3>Organize Client Programs</h3>
              <DashIcon className="landing-page-icon" style={iconStyle} />
            </div>
            <div className="landing-page-col">
              <h3>Create incentives, Stake ETH</h3>
              <img className="landing-page-icon" style={iconStyle} src="https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black_small.png" />
            </div>
          </div>
        </div>
        <div className="landing-page-image">
          {/*<img src="FILL IN WITH PHOTO" />*/}
        </div>
        {/*CALENDAR PREVIEW*/}
        <div className="landing-page-preview">
          <div className="landing-page-splitgrid">
            <div className="landing-page-col">
              {/*<img src="FILL WITH SCREENSHOT" />*/}
            </div>
            <div className="landing-page-col">
              <div className="landing-page-col-text">
                <p className="landing-page-txt">Schedule workouts.</p>
                <p className="landing-page-txt">Add to client calendars.</p>
              </div>
            </div>
          </div>
        </div>
        {/*EXERCISE PREVIEW*/}
        <div className="landing-page-preview">
          <div className="landing-page-splitgrid">
            <div className="landing-page-col">
              <div className="landing-page-col-text">
                <p className="landing-page-txt">Plan and track exercises.</p>
                <p className="landing-page-txt">Star exercises for simple re-use.</p>
                <p className="landing-page-txt">Craft workouts with ease.</p>
              </div>
            </div>
            <div className="landing-page-col">
              {/*<img src="FILL WITH SCREENSHOT" />*/}
            </div>
          </div>
        </div>
        {/*CLIENT PREVIEW*/}
        <div className="landing-page-preview">
          <div className="landing-page-splitgrid">
            <div className="landing-page-col">
              {/*<img src="FILL WITH SCREENSHOT" />*/}
            </div>
            <div className="landing-page-col">
              <div className="landing-page-col-text">
                <p className="landing-page-txt">View client's progression.</p>
                <p className="landing-page-txt">Utilize exercise history data to optimize regimens.</p>
              </div>
            </div>
          </div>
        </div>
        {/*INCENTIVE PREVIEW*/}
        <div className="landing-page-preview">
          <div className="landing-page-splitgrid">
            <div className="landing-page-col">
              <div className="landing-page-col-text">
                <p className="landing-page-txt">Self-incentivize your motivation.</p>
                <p className="landing-page-txt">Declare a goal.</p>
                <p className="landing-page-txt">Set a deadline.</p>
                <p className="landing-page-txt">Send ETH to a smart contract.</p>
                <p className="landing-page-txt">Hold yourself accountable.</p>
              </div>
            </div>
            <div className="landing-page-col">
              {/*<img src="FILL WITH SCREENSHOT" />*/}
            </div>
          </div>
        </div>
        <p className="landing-page-footer">Copyright &copy; 2018 BoostPT. All Rights Reserved.</p>
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