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
      showReceiptModal: false,
      receipt: {},
      incentives: []
    };
    this.toggleAddIncentiveModal = this.toggleAddIncentiveModal.bind(this);
    this.handleIncentiveFormChange = this.handleIncentiveFormChange.bind(this);
    this.handleIncentiveFormSubmit = this.handleIncentiveFormSubmit.bind(this);
    this.toggleReceiptModal = this.toggleReceiptModal.bind(this);
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

  toggleReceiptModal() {
    if (this.state.showReceiptModal) {
      this.fetchIncentives();
    }
    this.setState({
      showReceiptModal: !this.state.showReceiptModal
    });
  }

  async fetchIncentives() {
    const instance = await this.state.stakeEther.deployed();
    const rawIncentives = await instance.fetchIncentives();
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

    let parsedIncentives = Array(rawIncentives[0].length).fill({});

    for (let i = 0; i < rawIncentives.length; i++) {
      for (let j = 0; j < parsedIncentives.length; j++) {
        if (i === 0) {
          parsedIncentives[j]['id'] = rawIncentives[i][j];
        } else if (i === 1) {
          parsedIncentives[j]['creatorAddress'] = rawIncentives[i][j];
        } else if (i === 2) {
          parsedIncentives[j]['recipientAddress'] = rawIncentives[i][j];
        } else if (i === 3) {
          parsedIncentives[j]['goal'] = web3.toAscii(rawIncentives[i][j]);
        } else if (i === 4) {
          parsedIncentives[j]['deadline'] = rawIncentives[i][j].toNumber();
        } else { // i === 5
          parsedIncentives[j]['staked'] = web3.fromWei(rawIncentives[i][j], 'ether').toNumber();
        }
      }
    }

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

    const { receipt } = await instance.createIncentive(
      this.state.recipient,
      this.state.goal,
      deadline,
      { from: this.state.web3.eth.accounts[0], value: this.state.web3.toWei(this.state.eth, 'ether'), gas: 250000, gasPrice: 20000000000  });
    // Default Gas Limit: 250,000
    // Default Gas Price: 20 Gwei

    if (receipt) {
      this.setState({
        showAddIncentiveModal: false,
        showReceiptModal: true,
        receipt: receipt
      });
    }
  }

  render() {
    return (
      <StakeEtherMotivation
        incentives={this.state.incentives}
        showAddIncentiveModal={this.state.showAddIncentiveModal}
        toggleAddIncentiveModal={this.toggleAddIncentiveModal}
        handleIncentiveFormChange={this.handleIncentiveFormChange}
        handleIncentiveFormSubmit={this.handleIncentiveFormSubmit}
        showReceiptModal={this.state.showReceiptModal}
        toggleReceiptModal={this.toggleReceiptModal}
        receipt={this.state.receipt}
      />
    )
  }
}

export default StakeEtherContainer;