import React from 'react';
import { render } from 'react-dom';
import DealFinder from './components/deal_finder.jsx';
import './styles/app.css';

const App = React.createClass({
  render () {
    return (
      <DealFinder />
    );
  }
});

render(<App/>, document.getElementById('app'));
