// this component selects images and convert them to pdfs and stitch them to single pdfs
import React, { Component } from "react";
import jsPDF from "jspdf";

import cancel from "./cancel.png";
import add from "./add.png";
import ImageThumbnail from "./ImageThumbnail";

const pdf = new jsPDF("p", "mm", "a4");
class ImageUpload extends Component {

  state = {
      imageUrls: [],
      pdfData: "",
      displayImage: ""
    };
  // selects images data and convert them to base 64 data
  imageSelectorEvent = e => {
    const { imageUrls } = this.state;
    const {}
    for (let i = 0; i <= e.target.files.length - 1; i++) {
      const imageReader = new FileReader();
      imageReader.readAsDataURL(e.target.files[i]);
      imageReader.onloadend = () =>
        this.setState(
          {
            imageUrls: imageUrls.concat([imageReader.result]),
            displayImage: imageReader.result
          },
          () => document.getElementById("add-button").scrollIntoView()
        );
    }
  };

  // takes array of base 64 image data, convert them into pdf and stich pdfs into one pdf
  attachFileAsPDF = () => {
    const { imageUrls, pdfData } = this.state;
    const { pdfDataUrl } = this.props;
    for (let i = 0; i <= imageUrls.length - 1; i++) {
      pdf.addImage(imageUrls[i], "JPEG", 5, 5, 200, 280);
      pdf.addPage();
    }
    const pdfReader = new FileReader();
    pdfReader.readAsDataURL(pdf.output("blob"));
    pdfReader.onloadend = () =>
      this.setState({ pdfData: pdfReader.result }, () =>{
        this.setState({ imageUrls: [] })
        pdfDataUrl(pdfData)
      }
        
      );
  };

  // render scrollable thumbnail images
  renderScrollableImages = () =>{
    const{imageUrls}=this.state
    return imageUrls.map((url) => (
      <ImageThumbnail
        key={url}
        url={url}
        onClick={() => this.setState({ displayImage: url })}
        onDeleteImage={() => this.deleteThumbnailImage(url)}
        alt={url}
      />
    ));
  }
    

  // delete thumbnail image
  deleteThumbnailImage = item =>{
    const{imageUrls}=this.state;
    this.setState(
      { imageUrls: imageUrls.filter(url => item !== url) },
      () => this.setState({ displayImage: imageUrls[0] })
    );
  }
    
// close the carousal
  onClose = () => this.setState({ imageUrls: [], pdfData:'', displayImage:'' });

  render() {
    const {imageUrls}=this.state
    const doesContainImages = !!imageUrls.length;
    console.log(imageUrls.length)
    return (
      <div>
        {doesContainImages && (
          <div className="App">
            <img src={cancel} className="close-icon" onClick={this.onClose} />
            <img src={this.state.displayImage} className="large-image" />
            <div className="scrolling-wrapper">
              {this.renderScrollableImages()}
              <ImageThumbnail
                id="add-button"
                url={add}
                hideDelete
                htmlFor="camera-device"
              />
            </div>
            <button
              className=" btn btn-warning attach-pdf"
              onClick={this.attachFileAsPDF}
            >
              Attach as PDF
            </button>
          </div>
        )}
        <input
          type="file"
          id="camera-device"
          capture="camera"
          multiple
          className="d-none"
          onChange={this.imageSelectorEvent}
        />
        {!doesContainImages && (
          <label className="btn btn-primary" htmlFor="camera-device">
            Choose file
          </label>
        )}
      </div>
    );
  }
}

export default ImageUpload;
