import React, { Component } from 'react';

import Cart from './client/components/Cart/Cart';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Cart />
      </div>
    );
  }
}

export default App;
