import React from 'react';
import "./App.css";

const FileViewer=({ url, alt, onClick})=>(
     <div className="card">
        <img
            src={url}
            alt={alt}
            className="image"
            hspace="5"
            onClick={onClick}
          />
 </div>
)

export default FileViewer;