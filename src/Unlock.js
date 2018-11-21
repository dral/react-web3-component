import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from './Web3Context';

const unlock = (web3, onUnlock, onError, account, password, duration) => () => {
  account = web3.utils.toChecksumAddress(account);
  web3.eth.personal.unlockAccount(account, password, duration)
    .then(result => {
      onUnlock(result);
    })
    .catch(error => {
      let message = error.message.split('\n')[0];
      onError(message);
    });
};

const defaultRenderer = ({unlockAction, disabled}) => (
  <button
    disabled={disabled}
    onClick={unlockAction}
  >
    Unlock
  </button>
);

const Unlock = ({
  password,
  duration,
  onUnlock = () => {},
  onError = () => {},
  children
}) => (
  <Web3Context.Consumer>
    {({
      web3,
      selectedAccount
    }) => {
      let unlockAction = unlock(web3, onUnlock, onError, selectedAccount, password, duration);
      let disabled = selectedAccount === undefined;
      let renderer = children || defaultRenderer;
      return renderer({
        selectedAccount,
        duration,
        unlockAction,
        disabled
      });
    }}
  </Web3Context.Consumer>
);

Unlock.propTypes = {
  children: PropTypes.func,
};

export default Unlock;
