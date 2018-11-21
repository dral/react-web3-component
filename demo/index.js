import React from 'react';
import { render} from 'react-dom';
import Sign from '../src/Sign';
import SelectedAccount from '../src/SelectedAccount';
import NewAccount from '../src/NewAccount';
import Accounts from '../src/Accounts';
import Unlock from '../src/Unlock';
import Web3Component from '../src/Web3Context';
import Web3 from 'web3';

let wsWeb3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

// <Web3Component>
const App = () => (
  <div>
    <div>
      <h1>Metamask</h1>
      <Web3Component>
        <Unlock/>
        <NewAccount/>
        <Sign message={'hello'}/>
        <SelectedAccount/>
        <Accounts/>
      </Web3Component>
    </div>
    <div>
      <h1>WebSocket</h1>
      <Web3Component web3={wsWeb3}>
        <Unlock/>
        <NewAccount/>
        <Sign message={'hello'}/>
        <SelectedAccount/>
        <Accounts/>
      </Web3Component>
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
