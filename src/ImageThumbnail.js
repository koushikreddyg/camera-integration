import React from "react";
import PropTypes from 'prop-types';

import cancel from "./cancel.png";

// this component displays image thumbnail

const ImageThumbnail = ({
  url,
  alt,
  onClick,
  onDeleteImage,
  hideDelete,
  fileViewerStyle,
  htmlFor,
  id
}) => (
  <label className="card" htmlFor={htmlFor}>
    {!hideDelete && (
      <img src={cancel} className="delete-image" onClick={onDeleteImage} />
    )}
    <img
      id={id}
      src={url}
      alt={alt}
      className="thumbnail"
      hspace="5"
      onClick={onClick}
    />
  </label>
);

ImageThumbnail.propTypes={
  url: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
  onDeleteImage: PropTypes.func,
  hideDelete: PropTypes.bool,
  fileViewerStyle: PropTypes.object,
  htmlFor: PropTypes.string,
  id: PropTypes.string,
}
ImageThumbnail.defaultProps={
  url: '',
  alt: '',
  onClick: ()=>undefined,
  onDeleteImage: ()=>undefined,
  hideDelete: false,
  fileViewerStyle: {},
  htmlFor: '',
  id: '',
}

export default ImageThumbnail;
