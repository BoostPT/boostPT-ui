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
      stakeEther: null
    };
  }

  async componentDidMount() {
    let stakeEther = TruffleContract(stakeEtherABI);
    const web3 = await this.getWeb3();
    stakeEther.setProvider(web3.currentProvider);
    this.setState({
      web3: web3,
      stakeEther: stakeEther
    });
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
      const provider = new Web3.providers.HttpProvider('http://localhost:7545');
      const web3 = new Web3(provider);
      console.log('No web3 instance injected, using Local web3.');
      // alert('This feature needs a web3 provider to run. Please install MetaMask at metamask.io or use the Mist browser.');
      return web3;
    }
  }

  fetchIncentives() {
    // this.props.contract
  }

  render() {
    return (
      <StakeEtherMotivation />
    )
  }
}

export default StakeEtherContainer;