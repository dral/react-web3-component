import React from 'react';
import { render} from 'react-dom';
import Sign from '../src/Sign';
import SelectedAccount from '../src/SelectedAccount';
import NewAccount from '../src/NewAccount';
import Accounts from '../src/Accounts';
import Unlock from '../src/Unlock';
import Web3Provider from '../src/Web3Context';
import Web3 from 'web3';

let wsWeb3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

// <Web3Component>
const App = () => (
  <div>
    <div>
      <h1>Metamask</h1>
      <Web3Provider>
        <Unlock/>
        <NewAccount/>
        <Sign
          message={'hello'}
          onError={console.error}
          onSign={console.log}
        />
        <Sign
          message='Login nonce: 1234'
          onSign={console.log}
          onError={console.error}
        >
          {
            ({
              message,
              disabled,
              selectedAccount,
              signAction,
            }) => (
              <div>
                <button disabled={disabled} onClick={signAction}>
                  Login with <code>{`${!disabled && selectedAccount.substring(0, 6)}…`}</code>
                </button>
              </div>
            )
          }
        </Sign>
        <SelectedAccount/>
        <Accounts/>
      </Web3Provider>
    </div>
    <div>
      <h1>WebSocket</h1>
      <Web3Provider web3={wsWeb3}>
        <Unlock/>
        <NewAccount/>
        <Sign
          message={'hello'}
          password='strong password'
          onError={console.error}
          onSign={console.log}
        />
        <SelectedAccount/>
        <Accounts/>
      </Web3Provider>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
