import React from 'react';
import PropTypes from 'prop-types';

function ProductImage({ picture, altText = 'Produkt' }) {
  return (
    <>
      <button
        className="ml-[130px] absolute left-4 top-1/2 transform -translate-y-1/2 bg-white border rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-200"
        aria-label="Poprzednie"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      <div className="flex justify-center px-20">
        <img
          src={picture}
          alt={altText}
          className="rounded-xl shadow-md aspect-3/2 object-cover max-w-1/2"
        />
      </div>

      <button
        className="mr-[130px] absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-200"
        aria-label="Następne"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </>
  );
}

export default ProductImage;

ProductImage.propTypes = {
  picture: PropTypes.string.isRequired,
  altText: PropTypes.string,
};
