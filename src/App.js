import React, { Component } from 'react';

import Cart from './client/components/Cart/Cart';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Cart />
      </div>
    );
  }
}

export default App;
