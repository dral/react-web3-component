import React from 'react';
import Web3 from 'web3';

let defaultWeb3 = new Web3(Web3.givenProvider);

export const Web3Context = React.createContext({
  defaultWeb3,
  selectedAddress: undefined,
  accounts: [],
  selectAccount: () => {}
});

class Web3Component extends React.Component {
  constructor({web3 = defaultWeb3}) {
    super();
    this.updateAccounts = this.updateAccounts.bind(this);
    this.selectAccount = this.selectAccount.bind(this);
    this.initMetamask = this.initMetamask.bind(this);

    this.state = {
      web3,
      selectedAddress: undefined,
      accounts: [],
      selectAccount: this.selectAccount,
      updateAccounts: this.updateAccounts,
    };

    if (web3.currentProvider.publicConfigStore) {
      this.initMetamask();
    } else {
      this.updateAccounts();
    }
  }

  selectAccount(account) {
    this.updateAccounts(account);
  }

  initMetamask(){
    let {web3} = this.state;
    web3.currentProvider.publicConfigStore.on('update', () => this.updateAccounts());
    web3.currentProvider.enable()
      .then(accounts => accounts.map(web3.utils.toChecksumAddress))
      .then(accounts => {
        this.setState({
          selectedAddress: accounts[0],
          accounts
        });
      })
      .catch(console.error);
  }

  updateAccounts(account) {
    let { onUpdate } = this.props || {};
    let { web3 } = this.state;

    web3.eth.getAccounts()
      .then(accounts => accounts.map(web3.utils.toChecksumAddress))
      .then(accounts => {
        let selectedAddress = accounts[0];
        if (account) {
          account = web3.utils.toChecksumAddress(account);
          if (accounts.indexOf(account) >= 0) {
            selectedAddress = account;
          }
        }
        let update = {
          selectedAddress,
          accounts
        };
        this.setState(update);
        if (onUpdate) {
          onUpdate(update);
        }
      })
      .catch(console.error);
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
