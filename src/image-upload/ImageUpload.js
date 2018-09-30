// this component selects images and convert them to pdfs and stitch them to single pdfs
import React, { Component } from "react";
import jsPDF from "jspdf"; // download version 1.4.1
import PropTypes from "prop-types";
import axios from 'axios';

import cancel from "./cancel.png";
import add from "./add.png";
import ImageThumbnail from "./ImageThumbnail";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

let pdf = new jsPDF("p", "mm", "a4");
class ImageUpload extends Component {
  state = {
    imageUrls: [],
    pdfData: "",
    displayImage: ""
  };

  // selects images data and convert them to base 64 data
  imageSelectorEvent = async e => {
    for (let i = 0; i <= e.target.files.length - 1; i++) {
      const imageReader = new FileReader();
      const file = e.target.files[i];
      imageReader.readAsDataURL(file);
      imageReader.onloadend = () =>
        this.setState(
          {
            imageUrls: this.state.imageUrls.concat([imageReader.result]),
            displayImage: imageReader.result
          },
          () => document.getElementById("add-button").scrollIntoView()
        );
    }
  };

  // takes array of base 64 image data, convert them into pdf and stich pdfs into one pdf
  attachFileAsPDF = () => {
    const { pdfDataUrl } = this.props;
    for (let i = 0; i <= this.state.imageUrls.length - 1; i++) {
      pdf.addImage(this.state.imageUrls[i], "JPEG", 5, 5, 200, 280);
      i !== this.state.imageUrls.length - 1 && pdf.addPage();
    }
    let pdfReader = new FileReader();
    pdfReader.readAsDataURL(pdf.output("blob"));
    pdfReader.onloadend = () =>
      this.setState({ pdfData: pdfReader.result }, () => {
        this.setState({ imageUrls: [] });
        pdfDataUrl(this.state.pdfData);

        //  download pdf from url
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



        
      });
  };

  // render scrollable thumbnail images
  renderScrollableImages = () =>
    this.state.imageUrls.map(url => (
      <ImageThumbnail
        key={url}
        url={url}
        onClick={() => this.setState({ displayImage: url })}
        onDeleteImage={() => this.deleteThumbnailImage(url)}
        alt={url}
      />
    ));

  // delete thumbnail image
  deleteThumbnailImage = item =>
    this.setState(
      { imageUrls: this.state.imageUrls.filter(url => item !== url) },
      () => this.setState({ displayImage: this.state.imageUrls[0] })
    );

  // close the carousal
  onClose = () =>
    this.setState({ imageUrls: [], pdfData: "", displayImage: "" });

  render() {
    const doesContainImages = !!this.state.imageUrls.length;
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
          accept="image/jpg, image/png"
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

ImageUpload.propTypes = {
  pdfDataUrl: PropTypes.func.isRequired
};

export default ImageUpload;
