import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from './Web3Context';

const newAccount = (web3, onCreate, onError, updateAccounts, password) => () => {
  web3.eth.personal.newAccount(password)
    .then(result => {
      updateAccounts(result);
      onCreate(result);
    })
    .catch(error => {
      let message = error.message.split('\n')[0];
      onError(message);
    });
};

const defaultRenderer = ({newAccountAction}) => (
  <button onClick={newAccountAction}>
    New Account
  </button>
);

const NewAccount = ({
  password = '',
  onCreate = () => {},
  onError = () => {},
  children
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
      let renderer = children || defaultRenderer;
      return renderer({
        newAccountAction
      });
    }}
  </Web3Context.Consumer>
);

NewAccount.propTypes = {
  children: PropTypes.func,
};

export default NewAccount;
