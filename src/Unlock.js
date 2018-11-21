import React from 'react';
import { Web3Context } from './Web3Context';

const unlock = (web3, onUnlock, onError, account, password, duration) => () => {
  account = web3.utils.toChecksumAddress(account);
  web3.eth.personal.unlockAccount(account, password, duration)
    .then(result => {
      onUnlock(result);
    })
    .catch((error) => {
      let message = error.message.split('\n')[0];
      if (onError){
        onError(message);
      }
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
  onUnlock = console.log,
  onError = console.error,
  render = defaultRenderer
}) => (
  <Web3Context.Consumer>
    {({
      web3,
      selectedAddress
    }) => {
      let unlockAction = unlock(web3, onUnlock, onError, selectedAddress, password, duration);
      let disabled = selectedAddress === undefined;
      return render({unlockAction, disabled});
    }}
  </Web3Context.Consumer>
);

export default Unlock;
