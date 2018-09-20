import React, { Component } from 'react';
// import Camera from './Camera';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <input type="file" accept="image/*;capture=camera" multiple>select multiple files</input>
      </div>
    );
  }
}

export default App;
