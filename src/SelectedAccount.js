import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from './Web3Context';

const defaultRenderer = ({selectedAccount}) => {
  return (
    <code>{selectedAccount ? selectedAccount :  'no address' }</code>
  );
};

const SelectedAccount = ({children}) => (
  <Web3Context.Consumer>
    {({
      selectedAccount
    }) => {
      let renderer = children || defaultRenderer;
      return renderer({
        selectedAccount
      });
    }}
  </Web3Context.Consumer>
);

SelectedAccount.propTypes = {
  children: PropTypes.func,
};

export default SelectedAccount;
