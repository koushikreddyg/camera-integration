import React, { Component } from "react";

import ImageUpload from "./image-upload/ImageUpload";

class App extends Component {
 

  checkForCamera=()=>(/iphone|ipod|android|blackberry/)
  .test(navigator.userAgent.toLowerCase())

  

  render() {
    return (
      <div>
        {/* !this.checkForCamera()&& <h1>Camera is not supported</h1> */}
        {/* this.checkForCamera() &&<ImageUpload pdfDataUrl={(data)=>{}} />*/}   
        <ImageUpload pdfDataUrl={()=>{}}/>
      </div>
    );
  }
}

export default App;
