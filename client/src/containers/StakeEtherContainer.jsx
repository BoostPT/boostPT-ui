import React, { Component } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract'
import stakeEtherABI from '../../../../boostPT-api/solidity/build/contracts/StakeEtherMotivation.json';
import StakeEtherMotivation from '../components/dashPage/StakeEtherMotivation.jsx';

class StakeEtherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      stakeEther: null, // contract,
      showAddIncentiveModal: false,
      goal: '',
      recipient: '',
      deadlineDate: '',
      deadlineTime: '',
      eth: '',
      showTxHashModal: false,
      txHash: '',
      incentives: []
    };
    this.toggleAddIncentiveModal = this.toggleAddIncentiveModal.bind(this);
    this.handleIncentiveFormChange = this.handleIncentiveFormChange.bind(this);
    this.handleIncentiveFormSubmit = this.handleIncentiveFormSubmit.bind(this);
    this.toggleTxHashModal = this.toggleTxHashModal.bind(this);
  }

  async componentDidMount() {
    let stakeEther = TruffleContract(stakeEtherABI);
    const web3 = await this.getWeb3();
    stakeEther.setProvider(web3.currentProvider);
    this.setState({
      web3: web3,
      stakeEther: stakeEther
    });
    this.fetchIncentives();
  }

  getWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);
      console.log('Injected web3 detected.');
      return web3;
    } else {
      // Fallback to localhost if no web3 injection, using Ganache port.
      // const provider = new Web3.providers.HttpProvider('http://localhost:7545');
      // const web3 = new Web3(provider);
      // console.log('No web3 instance injected, using Local web3.');
      alert('This feature needs a web3 provider to run. Please install MetaMask at metamask.io or use the Mist browser.');
      // return web3;
    }
  }

  toggleAddIncentiveModal() {
    this.setState({
      showAddIncentiveModal: !this.state.showAddIncentiveModal
    });
  }

  toggleTxHashModal() {
    if (this.state.showReceiptModal) {
      this.fetchIncentives();
    }
    this.setState({
      showTxHashModal: !this.state.showTxHashModal
    });
  }

  async fetchIncentives() {
    const instance = await this.state.stakeEther.deployed();
    const rawIncentives = await instance.fetchIncentives({
      from: this.state.web3.eth.accounts[0]
    });

    if (rawIncentives[0].length < 1) return;

    // Incentive metadata is deconstructed
    // Data received from the contract are in the following structure:

    // [
    //   [incentiveId (bytes32), ...],
    //   [creatorAddress (address), ...],
    //   [recipientAddress (address), ...],
    //   [goal (bytes32), ...], // Needs to be converted to String
    //   [deadline (uint), ...],  // Needs to be converted from s to ms
    //   [staked (uint), ...] // Needs to be converted from Wei to Ether
    // ]

    let parsedIncentives = Array(rawIncentives[0].length);

    for (let i = 0; i < parsedIncentives.length; i++) {
      parsedIncentives[i] = {};
      for (let j = 0; j < rawIncentives.length; j++) {
        if (j === 0) {
          parsedIncentives[i]['id'] = rawIncentives[j][i];
        } else if (j === 1) {
          parsedIncentives[i]['creatorAddress'] = rawIncentives[j][i];
        } else if (j === 2) {
          parsedIncentives[i]['recipientAddress'] = rawIncentives[j][i];
        } else if (j === 3) {
          parsedIncentives[i]['goal'] = web3.toAscii(rawIncentives[j][i]);
        } else if (j === 4) {
          parsedIncentives[i]['deadline'] = rawIncentives[j][i].toNumber();
        } else { // j === 5
          parsedIncentives[i]['staked'] = web3.fromWei(rawIncentives[j][i], 'ether').toNumber();
        }
      }
    }

    // The contract currently keeps mappings to old incentives to save user's money on deletion
    // Because fetching is free, it's okay for now that we can ignore the null entries
    parsedIncentives = parsedIncentives.filter(incentive => incentive.deadline !== 0);

    this.setState({
      incentives: parsedIncentives
    });
  }

  handleIncentiveFormChange(e) {
    this.setState({
      [e.target.getAttribute('data')] : e.target.value
    });
  }

  async handleIncentiveFormSubmit() {
    // Solidity time is seconds since Jan 1, 1970 00:00
    const deadline = (+new Date(`${this.state.deadlineDate} ${this.state.deadlineTime}`)) / 1000;

    const instance = await this.state.stakeEther.deployed();

    const txHash = await instance.createIncentive.sendTransaction(
      this.state.recipient,
      this.state.goal,
      deadline,
      { from: this.state.web3.eth.accounts[0],
        value: this.state.web3.toWei(this.state.eth, 'ether'),
        gas: 250000,
        gasPrice: 20000000000
    });
    // Default Gas Limit: 250,000
    // Default Gas Price: 20 Gwei

    if (txHash) {
      this.setState({
        showAddIncentiveModal: false,
        showTxHashModal: true,
        txHash
      });
    }
  }

  render() {
    return (
      <StakeEtherMotivation
        incentives={this.state.incentives}
        stakeEther={this.state.stakeEther}
        showAddIncentiveModal={this.state.showAddIncentiveModal}
        toggleAddIncentiveModal={this.toggleAddIncentiveModal}
        handleIncentiveFormChange={this.handleIncentiveFormChange}
        handleIncentiveFormSubmit={this.handleIncentiveFormSubmit}
        showTxHashModal={this.state.showTxHashModal}
        toggleTxHashModal={this.toggleTxHashModal}
        txHash={this.state.txHash}
      />
    )
  }
}

export default StakeEtherContainer;