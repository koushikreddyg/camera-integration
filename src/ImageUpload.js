import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import axios from "axios";

import next from "./next.png";
import cancel from "./cancel.png";
import add from './add.png';
import "./App.css";

import FileViewer from "./FileViewer";

const doc = new jsPDF("p", "mm", "a4");
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: [],
      pdfData: "",
      displayImage: "https://www.w3schools.com/images/w3schools_green.jpg"
    };
  }

  deleteImage = item =>
    this.setState(
      { imageUrls: this.state.imageUrls.filter(url => item !== url) },
      () => {
        this.setState({ displayImage: this.state.imageUrls[0] });
      }
    );

  renderImages = () =>
    this.state.imageUrls.map((url, i) => (
      <FileViewer
        key={i}
        url={url}
        onClick={() => this.setState({ displayImage: url })}
        onDeleteImage={() => this.deleteImage(url)}
        alt={url}
      />
    ));

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
        this.props.imagesLength(this.state.imageUrls.length)
      };
    }
  };

  attachFile = () => {
    for (let i = 0; i <= this.state.imageUrls.length - 1; i++) {
      doc.addImage(this.state.imageUrls[i], "JPEG", 5, 5, 200, 280);
      doc.addPage();
    }
    const pdfData = doc.output("blob");
    const pdfReader = new FileReader();
    pdfReader.readAsDataURL(pdfData);
    pdfReader.onloadend = () => {
      this.setState({ pdfData: pdfReader.result },()=>this.setState({imageUrls: []}));
      axios(pdfReader.result, {
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
    };
  };

  onClose=()=>this.setState({imageUrls: []})

  render() {
    const doesContainImages=!!this.state.imageUrls.length
    return (
      <div >
      {doesContainImages &&(
        <div className="App">
          <img src={cancel} className="close" onClick={this.onClose}/>
        <div className="imageDisplay">
          <img src={this.state.displayImage} className="fullImage" />
        </div>
        <div id="sliderWithOptions">
          <div className="imageList scrolling-wrapper">
            
            {this.renderImages()}
            <FileViewer
              url={add}
              hideDelete
              htmlFor="camera_device"
            />
          </div>
          <button className=" btn btn-warning options" onClick={this.attachFile}>
              Attach as PDF
            {/* <label className=" camera " htmlFor="camera_device">
              <img src={next} className="glyphicons" />
            </label> */}
            {/* <input className="input" />
            <div className="attachPdf" onClick={this.attachFile}>
              <img src={next} className="glyphicons" />
            </div> */}
          </button>
        </div>
        </div>
      )}
      <input
          type="file"
          id="camera_device"
          accept="application/pdf;capture=camera"
          capture="camera"
          multiple
          className="d-none"
          onChange={this.fileSelectorEvent}
        />
        {!doesContainImages && (
          <label className="btn btn-primary" htmlFor="camera_device">
            Choose file
          </label>
        )}
      
      </div>
    );
  }
}

export default App;
