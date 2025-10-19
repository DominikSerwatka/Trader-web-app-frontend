import React from 'react';
import PropTypes from 'prop-types';
import { useFavorites } from '../context/FavoritesContext.jsx';

function ProductAction({ addToCart, product, favoriteClick }) {
  const { favorites } = useFavorites();
  const addedToFavorites = favorites.some((p) => p.id === product.id);

  const favoriteButtonClass = addedToFavorites
    ? 'flex-1 py-3 px-6 inline-block bg-red-500 text-white rounded-md border border-red transition'
    : 'flex-1 py-3 px-6 inline-block bg-white text-dark rounded-md hover:bg-gray-200 border border-black transition';

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <button
          className="flex-1 py-3 px-6 inline-block bg-white text-dark rounded-md hover:bg-gray-200 border border-black transition"
          onClick={() => addToCart(product)}
        >
          Dodaj do koszyka
        </button>
        <button className={favoriteButtonClass} onClick={() => favoriteClick(product)}>
          <i className="fa-regular fa-heart"></i>
          Ulubione
        </button>
      </div>
    </>
  );
}

export default ProductAction;

ProductAction.propTypes = {
  addToCart: PropTypes.func.isRequired,
  favoriteClick: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};
