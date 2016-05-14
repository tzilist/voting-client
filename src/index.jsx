import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Red', 'Blue'];

ReactDOM.render(
  <Voting pair={pair} winner={"Red"}/>,
  document.getElementById('app')
);
