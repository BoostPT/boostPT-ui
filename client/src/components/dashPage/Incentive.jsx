import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import * as colors from "material-ui/styles/colors";
import moment from 'moment';

const incentiveBtnLabelStyle = {
  fontFamily: 'Lato',
  fontSize: '1.2em',
  textTransform: 'none',
  color: 'white'
};

const incentiveBtnStyle = {
  height: '2.4em',
  width: '6.4em',
  margin: '1.2em',
  justifyContent: 'center'
};

class Incentive extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper zDepth={2} className="incentive-item-outer">
        <div className="incentive-item-inner">
          <h3><b>Goal</b></h3>
          <p>{this.props.incentive.goal}</p>
          <br />
          <h3><b>Recipient Address</b></h3>
          <a href={`https://ropsten.etherscan.io/address/${this.props.incentive.recipientAddress}`} target="_blank">{this.props.incentive.recipientAddress}</a>
          <br /><br />
          <h3><b>Deadline</b></h3>
          <p>{moment.unix(this.props.incentive.deadline).format('MMMM Do YYYY, h:mm a')}</p>
          <br />
          <h3><b>ETH Staked</b></h3>
          <p>{this.props.incentive.staked}</p>
          <FlatButton
            label="Cancel"
            backgroundColor={colors.red300}
            hoverColor={colors.red500}
            rippleColor={colors.yellow500}
            labelStyle={incentiveBtnLabelStyle}
            style={incentiveBtnStyle}
            data={this.props.incentive.id}
            onClick={this.props.handleCancelClick}
          />
          <FlatButton
            label="Fulfilled!"
            backgroundColor={colors.green300}
            hoverColor={colors.green500}
            rippleColor={colors.yellow500}
            labelStyle={incentiveBtnLabelStyle}
            style={incentiveBtnStyle}
            data={this.props.incentive.id}
            onClick={this.props.handleFulfillClick}
          />
        </div>
      </Paper>
    )
  }
}

Incentive.propTypes = {
  incentive: PropTypes.object,
  handleCancelClick: PropTypes.func,
  handleFulfillClick: PropTypes.func
};

export default Incentive;