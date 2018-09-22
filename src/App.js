import React, { Component } from 'react';
// import Camera from './Camera';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount(){
    
  }
  
  onChange=(event)=>{
    console.log(__dirname)
    console.log(event.target.files)
  }
  render() {
    return (
      <div className="App">
      <input type="file" capture="camera" onChange={this.onChange}/>
      </div>
    );
  }
}

export default App;
