import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FileViewer from "./FileViewer";
import jsPDF from "jspdf";

const doc = new jsPDF();
class App extends Component {
  state = {
    imagePreviewUrl: [],
    pdfData: [],
  };

  uploadData = (e) => {
    e.preventDefault();
    
    const pdfReader = new FileReader();
   

    this.state.imagePreviewUrl.map((data) => {

      // doc.setFontSize(40);
      // doc.text(90, 50, "");

      doc.addImage(data, "", 15, 40, 180, 160);
     
      

      pdfReader.onloadend = () => {
        this.setState({ pdfData: this.state.pdfData.concat([pdfReader.result]) })
        console.log(pdfReader.result);
      
      }
     

    })
    const pdfData = doc.output('blob')
    pdfReader.readAsDataURL(pdfData);
    // doc.save('koushik')



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
        //  var doc = new jsPDF();
        //   doc.setFontSize(40);
        //   doc.text(90, 50, "");
        //   const data= doc.addImage(reader.result, "JPEG", 15, 40, 180, 160);
        //   const pdfData=doc.output('blob')
        //   const pdfReader= new FileReader();
        //   pdfReader.readAsDataURL(pdfData);
        //   pdfReader.onloadend=()=>{
        //     this.setState({pdfData: this.state.pdfData.concat(pdfReader.result)})
        //   }
        // console.log(data)
        // doc.save(this.state.pdfData)
        // console.log(ronaldo)
      }

    }
  };

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
    console.log(this.state.pdfData)
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
        {/* <a  download="pdfTitle" href={this.state.imagePreviewUrl} title='Download pdf document' >Koushik</a> */}
        <button className="btn btn-warning" onClick={this.uploadData}>upload to pdf</button>
      </div>
    );
  }
}

export default App;
