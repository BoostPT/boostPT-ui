import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import IncentiveContainer from '../../containers/IncentiveContainer.jsx';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import * as colors from "material-ui/styles/colors";

const incentiveBtnLabelStyle = {
  fontFamily: 'Lato',
  fontSize: '1em',
  textTransform: 'none',
  color: '#EEE'
};

const incentiveBtnStyle = {
  height: '3.2em',
  width: '14em',
  margin: '1.2em',
  justifyContent: 'center'
};

const renderTextField = (hintText, floatingLabelText, handleChange, id, multiLine = false, rowsMax = 1) => {
  return (
    <TextField
      hintText={hintText}
      floatingLabelText={floatingLabelText}
      floatingLabelStyle={{ color: '#9E9E9E', fontSize: '14px'}}
      floatingLabelFixed={true}
      multiLine={multiLine}
      rowsMax={rowsMax}
      underlineFocusStyle={{ borderColor: colors.yellow500 }}
      data={id}
      onChange={handleChange}
      style={{ width: '26em' }}
    />
  )
};

class StakeEtherMotivation extends Component {
  constructor(props) {
    super(props);
    this.renderIncentives = this.renderIncentives.bind(this);
    this.overlayClick = this.overlayClick.bind(this);
  }

  renderIncentives() {
    return this.props.incentives.length ? (
      <IncentiveContainer
        incentives={this.props.incentives}
        stakeEther={this.props.stakeEther}
        showTxHash={this.props.showTxHash}
      />
    ) : (
      <h3 className="incentive-list-header">You don't have any ETH incentives</h3>
    );
  }

  renderAddIncentiveModal() {
    return this.props.showAddIncentiveModal ? (
      <div className="modal-incentive" onClick={e => this.overlayClick(e, 'addIncentive')}>
        <div className="modal-incentive-content">
          <span className="close" onClick={this.props.toggleAddIncentiveModal}>&times;</span>
          <p className="incentive-list-header">Create an Incentive</p>
          <br />
          <Divider />
          {renderTextField('What do you want to achieve?', 'Goal', this.props.handleIncentiveFormChange, 'goal', true, 2)}
          <br />
          {renderTextField('0xCbdC7A852494eb6B4BcB44F114D2396AcAe15668', 'Recipient (Ethereum Address)', this.props.handleIncentiveFormChange, 'recipient')}
          <br />
          {renderTextField('MM/DD/YYYY', 'Deadline Date', this.props.handleIncentiveFormChange, 'deadlineDate')}
          <br />
          {renderTextField('HH:MM', 'Deadline Time (00:00 - 23:59)', this.props.handleIncentiveFormChange, 'deadlineTime')}
          <br />
          {renderTextField('ETH to stake (ex: 0.08)', 'Staked ETH', this.props.handleIncentiveFormChange, 'eth')}
          <br />
          <Divider />
          <FlatButton
            label="Send to Ethereum Network"
            backgroundColor={colors.grey600}
            hoverColor={colors.grey700}
            rippleColor={colors.yellow500}
            labelStyle={incentiveBtnLabelStyle}
            style={incentiveBtnStyle}
            onClick={this.props.handleIncentiveFormSubmit}
          />
        </div>
      </div>
    ) : (
      null
    )
  }

  overlayClick(e, modalType) {
    if (e.target.className === 'modal-incentive') {
      if (modalType === 'addIncentive') {
        this.props.toggleAddIncentiveModal();
      } else if (modalType === 'txhash') {
        this.props.toggleTxHashModal();
      }
    }
  }

  renderTxHashModal() {
    return this.props.showTxHashModal ? (
      <div className="modal-incentive" onClick={e => this.overlayClick(e, 'txhash')}>
        <div className="modal-incentive-content incentive-txhash">
          <span className="close" onClick={this.props.toggleTxHashModal}>&times;</span>
          <p className="incentive-list-header">Transaction Sent!</p>
          <br />
          <Divider />
          <p className="incentive-txhash-text">Transaction Hash: <a href={`https://ropsten.etherscan.io/tx/${this.props.txHash}`} target="_blank">{this.props.txHash}</a></p>
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
          <img
            className="eth-logo-left"
            src="https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black_small.png"
            onClick={this.props.fetchIncentives}
          />
          <img
            className="eth-logo-right"
            src="https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black_small.png"
            onClick={this.props.fetchIncentives}
          />
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
            onClick={this.props.toggleAddIncentiveModal}
          />
        </Paper>
        {this.renderAddIncentiveModal()}
        {this.renderTxHashModal()}
      </Fragment>
    )
  }
}

StakeEtherMotivation.propTypes = {
  incentives: PropTypes.array,
  stakeEther: PropTypes.func,
  showAddIncentiveModal: PropTypes.bool.isRequired,
  toggleAddIncentiveModal: PropTypes.func.isRequired,
  handleIncentiveFormChange: PropTypes.func.isRequired,
  handleIncentiveFormSubmit: PropTypes.func.isRequired,
  showTxHashModal: PropTypes.bool.isRequired,
  toggleTxHashModal: PropTypes.func.isRequired,
  txHash: PropTypes.string,
  showTxHash: PropTypes.func,
  fetchIncentives: PropTypes.func
};

export default StakeEtherMotivation;