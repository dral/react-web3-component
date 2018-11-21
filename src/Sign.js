import React from 'react';
import { Web3Context } from './Web3Context';

const sign = (web3, onSign, onError, account, message, password) => () => {
  let signature;
  account = web3.utils.toChecksumAddress(account);
  web3.eth.personal.sign(message, account, password)
    .then(sig => {
      signature = sig;
      return web3.eth.personal.ecRecover(message, sig);
    })
    .then(signedBy => {
      if (web3.utils.toChecksumAddress(signedBy) !== account) {
        throw new Error('Signature validation error');
      } else {
        onSign({
          signature,
          signedBy,
          message,
        });
      }
    })
    .catch((error) => {
      let message = error.message.split('\n')[0];
      if (onError){
        onError(message);
      }
    });
};

const defaultRenderer = ({signAction, disabled}) => (
  <button
    disabled={disabled}
    onClick={signAction}
  >
    Sign
  </button>
);

const Sign = ({
  message = '', // either a string or a buffer
  password,
  onSign = console.log,
  onError = console.error,
  render = defaultRenderer
}) => (
  <Web3Context.Consumer>
    {({
      web3,
      selectedAddress
    }) => {
      let hexMessage = `0x${Buffer.from(message).toString('hex')}`;
      let signAction = sign(web3, onSign, onError, selectedAddress, hexMessage, password);
      let disabled = selectedAddress === undefined;
      return render({signAction, disabled, message, hexMessage, selectedAddress});
    }}
  </Web3Context.Consumer>
);

export default Sign;
