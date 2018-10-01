import React, { Component } from "react";
import axios from 'axios';
import ImageUpload from "./image-upload/ImageUpload";

class App extends Component {


  checkForCamera = () => (/iphone|ipod|android|blackberry/)
    .test(navigator.userAgent.toLowerCase())

  pdfDownload=(pdf)=>
  axios(pdf, {
    method: "GET",
    responseType: "arraybuffer",
    encoding: null,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/pdf"
    }
  }).then(response => {
    let newBlob = new Blob([response.data]);
    let url = URL.createObjectURL(newBlob);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }
    const data = window.URL.createObjectURL(newBlob);
    let link = document.createElement("a");
    link.href = data;
    link.download = "full-package.pdf";
    link.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(data), 100;
    });
  });




  render() {
    return (
      <div>
        {/* !this.checkForCamera()&& <h1>Camera is not supported</h1> */}
        {/* this.checkForCamera() &&<ImageUpload pdfDataUrl={(data)=>{}} />*/}
        <ImageUpload pdfDataUrl={this.pdfDownload} />
      </div>
    );
  }
}

export default App;
