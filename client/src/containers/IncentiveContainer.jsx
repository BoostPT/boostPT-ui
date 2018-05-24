import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Incentive from '../components/dashPage/Incentive.jsx';

class IncentiveContainer extends Component {
  constructor(props) {
    super(props);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleFulfillClick = this.handleFulfillClick.bind(this);
  }

  async handleCancelClick(e) {
    const incentiveId = e.currentTarget.getAttribute('data');
    const instance = await this.props.stakeEther.deployed();
    const txHash = await instance.cancelIncentive.sendTransaction(
      incentiveId,
      { from: web3.eth.accounts[0],
        gas: 250000,
        gasPrice: 20000000000
    });
    this.props.showTxHash(txHash);
  }

  async handleFulfillClick(e) {
    const incentiveId = e.currentTarget.getAttribute('data');
    const instance = await this.props.stakeEther.deployed();
    const txHash = await instance.fulfillIncentive.sendTransaction(
      incentiveId,
      { from: web3.eth.accounts[0],
        gas: 250000,
        gasPrice: 20000000000
      });
    this.props.showTxHash(txHash);
  }

  render() {
    return (
      <Fragment>
        <h3 className="incentive-list-subheader">Your Incentives</h3>
        <br />
        {this.props.incentives.map(incentive => {
          return (
            <Incentive
              key={incentive.id}
              incentive={incentive}
              handleCancelClick={this.handleCancelClick}
              handleFulfillClick={this.handleFulfillClick}
            />
          )
        })}
      </Fragment>
  )
  }

}

IncentiveContainer.propTypes = {
  incentives: PropTypes.array,
  stakeEther: PropTypes.func,
  showTxHash: PropTypes.func
};

export default IncentiveContainer;