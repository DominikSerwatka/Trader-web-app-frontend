import React from 'react';
import PropTypes from 'prop-types';

function ProductsSort({ value, onSortChange }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-6">Sortowanie</h2>
      <div className="mb-6">
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          value={value}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Proponowane</option>
          <option value="price-asc">Od najniższej ceny</option>
          <option value="price-desc">Od najwyższej ceny</option>
        </select>
      </div>
    </>
  );
}

export default ProductsSort;

ProductsSort.propTypes = {
  value: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
