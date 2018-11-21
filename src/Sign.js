import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from './Web3Context';

const sign = (web3, onSign, onError, account, message, password) => () => {
  let signature;
  let hexMessage = `0x${Buffer.from(message).toString('hex')}`;
  account = web3.utils.toChecksumAddress(account);
  web3.eth.personal.sign(hexMessage, account, password)
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
          hexMessage,
        });
      }
    })
    .catch(error => {
      let message = error.message.split('\n')[0];
      onError(message);
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
  onSign = () => {},
  onError = () => {},
  children,
}) => (
  <Web3Context.Consumer>
    {({
      web3,
      selectedAccount
    }) => {
      let signAction = sign(web3, onSign, onError, selectedAccount, message, password);
      let disabled = selectedAccount === undefined;
      let renderer = children || defaultRenderer;
      return renderer({
        message,
        disabled,
        selectedAccount,
        signAction,
      });
    }}
  </Web3Context.Consumer>
);

Sign.propTypes = {
  children: PropTypes.func,
};

export default Sign;
