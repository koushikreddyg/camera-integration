import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Camera from './Camera';
import logo from './logo.svg';
// import './App.css';

class App extends Component {
  componentDidMount() {

  }

  onChange = (event) => {
    console.log(__dirname)
    console.log(event.target.files)
  }
  render() {
    return (
      <div >
        <input type="file" capture="camera" id="camera" style={{display:'none'}} onChange={this.onChange} />

        <label className="btn btn-primary" htmlFor="camera">Choose file</label>
      </div>
    );
  }
}

export default App;
