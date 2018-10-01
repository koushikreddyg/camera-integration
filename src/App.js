import React, { Component } from "react";
import axios from "axios";
import ImageUpload from "./image-upload/ImageUpload";

class App extends Component {
  state = { data: "" };

  checkForCamera = () =>
    /iphone|ipod|android|blackberry/.test(navigator.userAgent.toLowerCase());

  pdfDownload = pdf =>
    axios(pdf, {
      method: "GET",
      responseType: "arraybuffer",
      encoding: null,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf"
      }
    }).then(response => {
      const newBlob = new Blob([response.data]);
      const data = window.URL.createObjectURL(newBlob);
      this.setState({ data });
      let link= document.createElement('a');
      link.ref=data;
      link.download= "full package.pdf";
      link.click();
    });

  render() {
    return (
      <div>
        {!this.checkForCamera() && <h1>Camera is not supported</h1> }
        {this.checkForCamera()&& (
          <div>
            <ImageUpload pdfDataUrl={this.pdfDownload} />
            {this.state.data && <a href={this.state.data} download="full-package.pdf">
              download pdf
            </a>}
          </div>
        )}
      </div>
    );
  }
}

export default App;
