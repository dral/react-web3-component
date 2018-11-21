import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from './Web3Context';

const defaultRenderer = ({accounts, selectedAccount, updateAccounts}) => {
  return (
    <ul>
      {accounts.map(account => (
        account === selectedAccount ?
          (
            <li key={account}>
              <strong>
                <code>{account}</code>
              </strong>
            </li>
          ):(
            <li key={account}>
              <code>{account}</code>
              <button disabled={account === selectedAccount} onClick={() => updateAccounts(account)}>Select</button>
            </li>
          )
      ))}
    </ul>
  );
};

const Address = ({children}) => (
  <Web3Context.Consumer>
    {({
      selectedAccount,
      accounts,
      updateAccounts,
    }) => {
      let renderer = children || defaultRenderer;
      return renderer({
        selectedAccount,
        accounts,
        updateAccounts
      });
    }}
  </Web3Context.Consumer>
);

Address.propTypes = {
  children: PropTypes.func,
};

export default Address;
