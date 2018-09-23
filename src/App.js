import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileViewer from './FileViewer';


class App extends Component {

  state = {
    selectedFile: [],
    file: '',
    imagePreviewUrl: ''
  }



  // fileSelectorEvent = event => {
  //   e.preventDefault();
  //     // TODO: do something with -> this.state.file
  //     console.log('handle uploading-', this.state.file);
  //   }

  fileSelectorEvent = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)

  }

  renderImages = () =>
     
      this.state.imagePreviewUrl 
      &&
      <FileViewer 
      url={this.state.imagePreviewUrl} 
      onClick={()=>this.setState({imagePreviewUrl: '', file: ''})}
      />

  
  render() {
    const { imagePreviewUrl, file } = this.state;
    console.log(imagePreviewUrl)
    return (
      <div >
        <input type="file" capture="camera" id="camera" className="d-none" onChange={this.fileSelectorEvent} />

        <label className="btn btn-primary" htmlFor="camera">Choose file</label>


        {this.renderImages()}
      </div>
    );
  }
}

export default App;
