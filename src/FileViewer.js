import React from "react";
import "./App.css";
import cancel from "./cancel.png";

const FileViewer = ({ url, alt, onClick, onDeleteImage, hideDelete, fileViewerStyle, htmlFor }) => (
  <label className="card" htmlFor={htmlFor}>
    {!hideDelete&&<img src={cancel} className="delete-image fileViewerStyle" onClick={onDeleteImage}/>}
    <img src={url} alt={alt} className="image" hspace="5" onClick={onClick}  />
  </label>
);

export default FileViewer;
