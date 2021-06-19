import React from "react";
import "../ImageGallery/ImageGallery.scss";
import ImageGalleryItem from "../ImageGalleryItem";
import PropTypes from "prop-types";

const ImageGallery = ({ images, openModal }) => (
  <ul className="ImageGallery">
    {images.map(({ id, webformatURL, largeImageURL }) => {
      return (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          clickOnImage={openModal}
          largeImageURL={largeImageURL}
        />
      );
    })}
  </ul>
);
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      openModal: PropTypes.func.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default ImageGallery;
