import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import * as colors from "material-ui/styles/colors";

const incentiveBtnLabelStyle = {
  fontFamily: 'Lato',
  fontSize: '1em',
  textTransform: 'none',
  color: 'white'
};

const incentiveBtnStyle = {
  height: '3.2em',
  width: '12em',
  margin: '1.2em'
};

class StakeEtherMotivation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddIncentiveModal: false
    };
    this.toggleAddIncentiveModal = this.toggleAddIncentiveModal.bind(this);
  }

  renderIncentives() {
    return this.props.incentives ? (
      null // map
    ) : (
      <h3 className="incentive-list-header">You don't have any ETH incentives</h3>
    );
  }

  toggleAddIncentiveModal() {
    this.setState({
      showAddIncentiveModal: !this.state.showAddIncentiveModal
    });
  }

  renderAddIncentiveModal() {
    return this.state.showAddIncentiveModal ? (
      <div className="modal-incentive">
        <div className="modal-incentive-content">
          <p className="incentive-list-header">Create an Incentive</p>
          <FlatButton
            label="Send to Ethereum Network"
            backgroundColor={colors.grey600}
            hoverColor={colors.grey700}
            rippleColor={colors.yellow500}
            labelStyle={incentiveBtnLabelStyle}
            style={incentiveBtnStyle}
          />
          <span className="close" onClick={this.toggleAddIncentiveModal}>&times;</span>
        </div>
      </div>
    ) : (
      null
    )
  }

  render() {
    return (
      <Fragment>
        <Paper className="incentive-list">
          <img className="eth-logo-left" src="https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black_small.png" />
          <img className="eth-logo-right" src="https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black_small.png" />
          <h3 className="incentive-list-header">Create an incentive by staking Ether</h3>
          <br />
          <Divider />
          {this.renderIncentives()}
          <FlatButton
            label="Create an Incentive"
            backgroundColor={colors.grey600}
            hoverColor={colors.grey700}
            rippleColor={colors.yellow500}
            labelStyle={incentiveBtnLabelStyle}
            style={incentiveBtnStyle}
            onClick={this.toggleAddIncentiveModal}
          />
        </Paper>
        {this.renderAddIncentiveModal()}
      </Fragment>
    )
  }
}

StakeEtherMotivation.propTypes = {
  incentives: PropTypes.object
};

export default StakeEtherMotivation;