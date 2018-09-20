import React from 'react';
import Camera from 'react-dom-camera';
 
const CoolButton = ({ onClick }) => (
  <button onClick={onClick} type="button">
    Take photo
  </button>
);
 
export default () => (
  <Camera
    captureButtonRenderer={onClick => <CoolButton onClick={onClick} />}
    onTakePhoto={image =>
      console.log(image, 'do whatever you want with the image')
    }
  />
);