import React from 'react';
import { Web3Context } from './Web3Context';

const defaultRenderer = ({selectedAddress, disabled}) => {
  return (
    <code>{disabled ? 'no address' : selectedAddress}</code>
  );
};

const SelectedAccount = ({
  render = defaultRenderer
}) => (
  <Web3Context.Consumer>
    {({
      selectedAddress
    }) => {
      let disabled = selectedAddress === undefined;
      return render({selectedAddress, disabled});
    }}
  </Web3Context.Consumer>
);

export default SelectedAccount;
