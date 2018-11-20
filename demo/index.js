import React from 'react';
import { render} from 'react-dom';
import Sign from '../src/Sign';
import Web3Component from '../src/Web3Context';

const App = () => (
  <Web3Component>
    <Sign message={'hello'}/>
  </Web3Component>
);

render(<App />, document.getElementById('root'));
