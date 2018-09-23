import React from 'react';

const FileViewer=({onClick, url})=>(
    <div>
        <p onClick={onClick}>remove me</p>
        <img src={url}/>
    </div>
)

export default FileViewer;