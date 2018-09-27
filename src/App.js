import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import axios from "axios";

import FileViewer from './FileViewer';
import "./App.css";

const doc = new jsPDF("p", "mm", "a4");
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls:[],
      pdfData: "",
      displayImage:"https://www.w3schools.com/images/w3schools_green.jpg",
    };
  }

  renderImages=()=>
    this.state.imageUrls.map((url,i)=><FileViewer key={i} url={url} onClick={()=>this.setState({displayImage: url})} alt={url} />)
  
    fileSelectorEvent = async e => {
      for (let i = 0; i <= e.target.files.length - 1; i++) {
        const reader = new FileReader();
        const file = e.target.files[i];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.setState({
            imageUrls: this.state.imageUrls.concat(reader.result),
            displayImage: reader.result
          });
          
        };
      }
    };

    attachFile = () => {
      for (let i = 0; i <= this.state.imageUrls.length - 1; i++) {
  
        doc.addImage(this.state.imageUrls[i] , 'JPEG',  5, 5, 200, 280);
        doc.addPage();
       }
      const pdfData=doc.output('blob')
            const pdfReader= new FileReader();
            pdfReader.readAsDataURL(pdfData);
            pdfReader.onloadend=()=>{
                this.setState({pdfData: pdfReader.result})
                axios (pdfReader.result, {
                  method: 'GET',
                  responseType: 'arraybuffer',
                  encoding: null,
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                  }
                  
                })
                .then(response => {
                  let newBlob = new Blob([response.data]);
                  let url  = URL.createObjectURL(newBlob);
                  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(newBlob);
                    return;
                  }
                  const data = window.URL.createObjectURL(newBlob);
                  let link   = document.createElement('a');
                  link.href  = data;
                  link.download = "full-package.pdf";
                  link.click();
            
                  setTimeout(()=>{
                    window.URL.revokeObjectURL(data)
                  , 100});
            
                });
  
              }
    };
  

  render() {
    
    return (
      <div className="App">
    {/*  <div style={{position: 'absolute', paddingTop: 20, paddingLeft: 20, display: 'inline-block'}}>
     
      <input className="input" size="30"/>
      </div>  */}
        <div className="imageDisplay">

          <img src={this.state.displayImage}   className="fullImage"/>
        </div>
        <div id="sliderWithOptions">
        <div className="imageList row">
        {this.renderImages()}
        
        </div>
        <div  className="options">

        <input
          type="file"
          id="camera_device"
          accept="application/pdf;capture=camera"
          capture="camera"
          multiple
          className="d-none"
          onChange={this.fileSelectorEvent}
        />

        <label className=" btn btn-primary camera " htmlFor="camera_device">
          camera
        </label>

        {/* <div  className=" btn btn-primary camera ">camera</div> */}
        <div className=" btn btn-warning attachPdf" onClick={this.attachFile}>attach as pdf</div>
        </div>
        </div>
        
      </div>
    );
  }
}

export default App;
