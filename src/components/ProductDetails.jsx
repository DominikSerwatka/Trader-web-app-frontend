import React from 'react';
import PropTypes from 'prop-types';

function ProductDetails({ productName, productDescription, productPrice }) {
  return (
    <>
      <div>
        <h1 className="flex justify-center text-3xl font-bold mb-4">{productName}</h1>
        <p className="flex justify-center text-gray-600 mb-6">{productDescription}</p>
      </div>

      <div className="flex justify-center text-2xl font-bold text-dark mb-6">
        <p>{productPrice} zł</p>
      </div>
    </>
  );
}

export default ProductDetails;

ProductDetails.propTypes = {
  productName: PropTypes.string.isRequired,
  productDescription: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
};
