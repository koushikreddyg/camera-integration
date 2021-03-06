import React, { Component } from "react";
import jsPDF from "jspdf";
import axios from "axios";


const doc = new jsPDF("p", "mm", "a4");
var width = doc.internal.pageSize.width;    
var height = doc.internal.pageSize.height;
class App extends Component {
  state = {
    imagePreviewUrl: [],
    pdfData: "",
    visible: false
  };

  uploadData = () => {
   
    for (let i = 0; i <= this.state.imagePreviewUrl.length - 1; i++) {

      doc.addImage(this.state.imagePreviewUrl[i] , 'JPEG',  5, 5, 200, 280);
      doc.addPage();
     }
    const pdfData=doc.output('blob')
          const pdfReader= new FileReader();
          pdfReader.readAsDataURL(pdfData);
          pdfReader.onloadend=()=>{
            // doc.addPage();
            // doc.addImage(this.state.imagePreviewUrl[1] , ,15, 40, 180, 160);
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
          
                // IE doesn't allow using a blob object directly as link href
                // instead it is necessary to use msSaveOrOpenBlob
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                  window.navigator.msSaveOrOpenBlob(newBlob);
                  return;
                }
          
                // For other browsers:
                // Create a link pointing to the ObjectURL containing the blob.
                const data = window.URL.createObjectURL(newBlob);
                let link   = document.createElement('a');
                link.href  = data;
                link.download = "full-package.pdf";
                link.click();
          
                setTimeout(function(){
                  // For Firefox it is necessary to delay revoking the ObjectURL
                  window.URL.revokeObjectURL(data)
                , 100});
          
              });

            }
  };

  fileSelectorEvent = async e => {
    for (let i = 0; i <= e.target.files.length - 1; i++) {
      const reader = new FileReader();
      const file = e.target.files[i];
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: this.state.imagePreviewUrl.concat(reader.result)
        });
        
      };
    }
  };

  

  render() {
    const { imagePreviewUrl, pdfData, visible } = this.state;
    return (
      <div>
        {
          <button className="btn btn-warning" onClick={this.uploadData}>
            upload to pdf
          </button>
        }
        <input
          type="file"
          id="camera_device"
          accept="application/pdf;capture=camera"
          capture="camera"
          multiple
          className="d-none"
          onChange={this.fileSelectorEvent}
        />

        <label className="btn btn-primary" htmlFor="camera_device">
          Choose file
        </label>

        {/* this.renderImages() */}
        <br />
      </div>
    );
  }
}

export default App;
