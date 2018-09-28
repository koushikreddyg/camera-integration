import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ImageUpload from "./ImageUpload";

class App extends Component {
 

  

  render() {
    return (
      <div>
        
          <ImageUpload pdfDataUrl={this.pdfDataUrl}/>
        
      </div>
    );
  }
}

export default App;
