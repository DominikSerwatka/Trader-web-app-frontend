import React from 'react';
import ProductListing from './ProductListing';
import { useLoaderData } from 'react-router-dom';

function HomePageProductListings() {
  const products = useLoaderData();
  const productsToShow = products.slice(0, 4);

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Nasze najpopularniejsze produkty</h2>
          <div className="flex gap-6 overflow-hidden justify-center">
            {productsToShow.map((product) => (
              <ProductListing key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePageProductListings;
