import React from 'react';
import ProductsFilterGroup from './ProductsFilterGroup';
import PropTypes from 'prop-types';

function ProductsFilter({ searchParams, setSearchParams }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-6">Filtry</h2>

      <ProductsFilterGroup
        value={searchParams}
        category="material"
        options={['drewno', 'metal']}
        name="Materiał"
        setSearchParams={setSearchParams}
      />

      <ProductsFilterGroup
        value={searchParams}
        category="space"
        options={['pokoj', 'kuchnia', 'lazienka', 'biuro', 'sypialnia']}
        name="Pomieszczenie"
        setSearchParams={setSearchParams}
      />

      <ProductsFilterGroup
        value={searchParams}
        category="collection"
        options={['popularne', 'nowa-kolekcja']}
        name="Kolekcje"
        setSearchParams={setSearchParams}
      />

      <div className="mb-2 py-3">
        <button className="bg-white text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-200 border border-black transition">
          Zastosuj filtry
        </button>
      </div>
    </>
  );
}

export default ProductsFilter;

ProductsFilter.propTypes = {
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};
