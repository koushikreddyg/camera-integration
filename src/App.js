import React, { Component } from 'react';
// import Camera from './Camera';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  componentDidMount(){
    if (navigator.getUserMedia) {
      // Request the camera.
      navigator.getUserMedia(
        // Constraints
        {
          video: true
        },
    
        // Success Callback
        function(localMediaStream) {
    
        },
    
        // Error Callback
        function(err) {
          // Log the error to the console.
          console.log('The following error occurred when trying to use getUserMedia: ' + err);
        }
      );
    
    }
  }
  render() {
    return (
      <div className="App">
       
      </div>
    );
  }
}

export default App;
