import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileViewer from './FileViewer';


class App extends Component {

  state = {
    selectedFile: [],
    file: '',
    imagePreviewUrl: []
  }



  // fileSelectorEvent = event => {
  //   e.preventDefault();
  //     // TODO: do something with -> this.state.file
  //     console.log('handle uploading-', this.state.file);
  //   }

  fileSelectorEvent = (e) => {
    for (let i = 0; i <= e.target.files.length-1; i++){
      let reader = new FileReader();
      let file = e.target.files[i];
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        var data = reader.result;
       
          this.setState({
            file: file,
            imagePreviewUrl: this.state.imagePreviewUrl.concat(reader.result),
            noImage: false,
            ImageChoosen: true
          });
      
        }

        
     
    }
  }

  renderImages = () =>
     
      !!this.state.imagePreviewUrl.length 
      &&
      this.state.imagePreviewUrl.map((item, i)=> 
     
     <FileViewer 
     key={i}
      url={item} 
      // onClick={()=>this.setState({imagePreviewUrl: '', file: ''})}
      /> )
     

  
  render() {
    const { imagePreviewUrl, file } = this.state;
    console.log(imagePreviewUrl)
    return (
      <div >
        <input type="file" id="camera_device" multiple className="d-none" onChange={this.fileSelectorEvent} />

        <label className="btn btn-primary" htmlFor="camera_device">Choose file</label>


        {this.renderImages()}
      </div>
    );
  }
}

export default App;
