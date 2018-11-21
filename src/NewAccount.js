import React from 'react';
import { Web3Context } from './Web3Context';

const newAccount = (web3, onCreate, onError, updateAccounts, password) => () => {
  web3.eth.personal.newAccount(password)
    .then(result => {
      updateAccounts(result);
      onCreate(result);
    })
    .catch((error) => {
      let message = error.message.split('\n')[0];
      if (onError){
        onError(message);
      }
    });
};

const defaultRenderer = ({newAccountAction}) => (
  <button
    onClick={newAccountAction}
  >
    New Account
  </button>
);

const NewAccount = ({
  password,
  onCreate = console.log,
  onError = console.error,
  render = defaultRenderer
}) => (
  <Web3Context.Consumer>
    {({
      web3,
      updateAccounts
    }) => {
      let newAccountAction = newAccount(
        web3,
        onCreate,
        onError,
        updateAccounts,
        password
      );
      return render({newAccountAction});
    }}
  </Web3Context.Consumer>
);

export default NewAccount;
