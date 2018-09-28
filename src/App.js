import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import ImageUpload from "./ImageUpload";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesLength: 0
    };
  }

  imagesLength = imagesLength => this.setState({ imagesLength });

  render() {
    return (
      <div>
        
          <ImageUpload imagesLength={this.imagesLength} />
        
      </div>
    );
  }
}

export default App;
