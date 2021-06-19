import React from "react";
import "../ImageGalleryItem/ImageGalleryItem.scss";
import PropTypes from "prop-types";

const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  clickOnImage,
}) => (
  <li key={id} className="ImageGalleryItem">
    <img
      src={webformatURL}
      className="ImageGalleryItem-image"
      alt=""
      srcset={largeImageURL}
      onClick={clickOnImage}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  clickOnImage: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};


export default ImageGalleryItem;
