import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FileViewer from "./FileViewer";
import jsPDF from "jspdf";


const doc = new jsPDF();
class App extends Component {
  state = {
    imagePreviewUrl: [],
    pdfData: '',
  };

  uploadData = () => {
    for (let i = 0; i <= this.state.imagePreviewUrl.length - 1; i++) {
     
      doc.addImage(this.state.imagePreviewUrl[i] , 'png',  20, 40, 180, 160);  
      doc.addPage(); 
     }
    const pdfData=doc.output('blob')
          const pdfReader= new FileReader();
          pdfReader.readAsDataURL(pdfData);
          pdfReader.onloadend=()=>{
            // doc.addPage(); 
            // doc.addImage(this.state.imagePreviewUrl[1] , ,15, 40, 180, 160); 
              this.setState({pdfData: pdfReader.result})
             
             
            }
   
      
  }

  fileSelectorEvent = async e => {
    for (let i = 0; i <= e.target.files.length - 1; i++) {
      const reader = new FileReader();
      const file = e.target.files[i];
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: this.state.imagePreviewUrl.concat([reader.result])
         });
          
          
          }
      
      }

    }
  

  renderImages = () =>
    !!this.state.imagePreviewUrl.length &&
    this.state.imagePreviewUrl.map((item, i) => (
      <FileViewer
        key={i}
        url={item}
      // onClick={()=>this.setState({imagePreviewUrl: '', file: ''})}
      />
    ));

  render() {
    const {imagePreviewUrl, pdfData}= this.state;
    return (
      <div>
        {
           (
            <button className="btn btn-warning" onClick={this.uploadData}>upload to pdf</button>
          )
        }
        <a  download="pdfTitle" href={this.state.pdfData} title='Download pdf document' >Koushik</a> 
        <input
          type="file"
          id="camera_device"
          accept="application/pdf;capture=camera"
          
          multiple
          className="d-none"
          onChange={this.fileSelectorEvent}
        />

        <label className="btn btn-primary" htmlFor="camera_device">
          Choose file
        </label>

        {this.renderImages()}
        <br />
      </div>
    );
  }
}

export default App;
