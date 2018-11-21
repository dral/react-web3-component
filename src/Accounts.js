import React from 'react';
import { Web3Context } from './Web3Context';

const defaultRenderer = ({accounts, selectAccount}) => {
  return (
    <ul>
      {accounts.map(account => (
        <li key={account}>
          <code>{account}</code>
          <button onClick={() => selectAccount(account)}>Select</button>
        </li>
      ))}
    </ul>
  );
};

const Address = ({
  render = defaultRenderer
}) => (
  <Web3Context.Consumer>
    {({
      accounts,
      selectAccount,
    }) => {
      return render({accounts, selectAccount});
    }}
  </Web3Context.Consumer>
);

export default Address;
