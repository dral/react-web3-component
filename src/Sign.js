import React from 'react';
import { Web3Context } from './Web3Context';

const signAction = (web3, onError, onSign) => (account, message) => {
  let signature;
  web3.eth.personal.sign(message, account)
    .then(sig => {
      signature = sig;
      return web3.eth.personal.ecRecover(message, sig);
    })
    .then(signedBy => {
      if (signedBy !== account) {
        throw new Error('Signature validation error');
      } else {
        onSign(signature);
      }
    })
    .catch((error) => {
      let message = error.message.split('\n')[0];
      if (onError){
        onError(message);
      }
    });
};

const Sign = ({
  message = '',
  onSign = () => {},
  onError = () => {},
}) => (
  <Web3Context.Consumer>
    {({
      web3,
      selectedAddress
    }) => {
      // let onSign = signature => console.log(signature);
      // let onError = message => console.error(message);
      let sign = signAction(web3, onError, onSign);
      let hexMessage = `0x${Buffer.from(message).toString('hex')}`;
      return (
        <div>
          <code>{message}</code>
          <button
            disabled={selectedAddress === undefined}
            onClick={() => sign(selectedAddress, hexMessage)}
          >
            Sign
          </button>
        </div>
      );
    }}
  </Web3Context.Consumer>
);

export default Sign;
