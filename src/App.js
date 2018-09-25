import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FileViewer from "./FileViewer";
import jsPDF from "jspdf";
import merge from 'easy-pdf-merge';
import fs from 'fs';
import {get} from 'lodash';

const doc = new jsPDF();
class App extends Component {
  state = {
    imagePreviewUrl: [],
    pdfData: [],
  };

  uploadData = (e) => {
   
    fs.writeFile("./final_pdf.pdf", Buffer.concat([get(this.state.pdfData[0]), get(this.state.pdfData[1])]), function(err) {
      if(err) {
          return console.log(err);
      }
  
      console.log("The file was saved!");
  });
    
   
   
      
  }

  fileSelectorEvent = async e => {
    for (let i = 0; i <= e.target.files.length - 1; i++) {
      const reader = new FileReader();
      const file = e.target.files[i];
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // this.setState({
        //   imagePreviewUrl: this.state.imagePreviewUrl.concat([reader.result])
        // });
          // doc.text(90, 50, "");
          doc.addImage(reader.result , file.name, 15, 40, 180, 160);
          const pdfData=doc.output('blob')
          const pdfReader= new FileReader();
          pdfReader.readAsDataURL(pdfData);
          pdfReader.onloadend=()=>{
            
           
             this.setState({pdfData: this.state.pdfData.concat([pdfReader.result])})
             
            }
          }
      // doc.save(this.state.pdfData)
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
    return (
      <div>
        <input
          type="file"
          id="camera_device"
          multiple
          className="d-none"
          onChange={this.fileSelectorEvent}
        />

        <label className="btn btn-primary" htmlFor="camera_device">
          Choose file
        </label>

        {this.renderImages()}
        <br />
         <a  download="pdfTitle" href={this.state.pdfData} title='Download pdf document' >Koushik</a> 
        <button className="btn btn-warning" onClick={this.uploadData}>upload to pdf</button>
      </div>
    );
  }
}

export default App;
