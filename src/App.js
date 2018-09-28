import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import ImageUpload from './ImageUpload';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  

  render() {
    return (
      <div>
        <ImageUpload />
      </div>
    );
  }
}

export default App;
