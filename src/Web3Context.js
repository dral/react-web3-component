import React from 'react';
import Web3 from 'web3';

let defaultWeb3 = new Web3(Web3.givenProvider);

export const Web3Context = React.createContext({defaultWeb3, selectedAddress: undefined});

class Web3Component extends React.Component {
  constructor() {
    super();
    this.onUpdate = this.onUpdate.bind(this);
    this.initState = this.initState.bind(this);
    let {web3 = defaultWeb3} = this.props || {};
    web3.currentProvider.publicConfigStore.on('update', this.onUpdate);
    this.state = {
      web3,
      selectedAddress: undefined,
      networkVersion: undefined,
    };
    this.initState();
  }

  initState(){
    this.state.web3.currentProvider.enable()
      .then(accounts => accounts[0])
      .then(account => {
        this.setState({selectedAddress: account});
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log('error', error));
  }

  onUpdate(event) {
    let { selectedAddress, networkVersion } = event;
    let { onUpdate } = this.props || {};
    this.setState({selectedAddress: selectedAddress, networkVersion});
    if (onUpdate) {
      onUpdate(event);
    }
  }

  componentWillUnmount(){
    this.state.web3.currentProvider.publicConfigStore.on('update', () => {
      this.updateAccount();
    });
  }

  render() {
    return (
      <Web3Context.Provider value={this.state}>
        {this.props.children}
      </Web3Context.Provider>
    );
  }
}

export default Web3Component;
