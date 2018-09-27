import React from 'react';
import "./App.css";

const FileViewer=({ url, alt})=>(
      
        <img
            src={url}
            alt={alt}
            className="image"
            hspace="5"
          />
  
)

export default FileViewer;