import React from "react";
import "./App.css";
import cancel from "./cancel.png";

const FileViewer = ({ url, alt, onClick, onDeleteImage }) => (
  <div className="card">
    <img src={cancel} className="delete-image" onClick={onDeleteImage}/>
    <img src={url} alt={alt} className="image" hspace="5" onClick={onClick} />
  </div>
);

export default FileViewer;
