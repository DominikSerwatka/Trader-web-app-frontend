// import React from 'react';
// import ProductListing from '../components/ProductListing';
// import ProductsSort from '../components/ProductsSort';
// import ProductsFilter from '../components/ProductsFilter';
// import Spinner from '../components/Spinner';
// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';

// function ProductsPage() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         var url = 'api/products/all';
//         searchParams.forEach((value, key) => {
//           url += (url.includes('?') ? '&' : '?') + `${key}=${value}`;
//         });
//         const res = await fetch(url);
//         const data = await res.json();
//         setProducts(data);
//         console.log('Fetched products:', data);
//       } catch (error) {
//         console.log('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [searchParams]);

//   const [sortOrder, setSortOrder] = useState('default');

//   const handleSortChange = (value) => setSortOrder(value);

//   const sortProducts =
//     sortOrder != 'default'
//       ? [...products].sort((a, b) => {
//           if (sortOrder == 'price-asc') {
//             return a.price - b.price;
//           } else if (sortOrder == 'price-desc') {
//             return b.price - a.price;
//           } else {
//             return 0;
//           }
//         })
//       : products;

//   return (
//     <>
//       <section className="mt-10 bg-white px-4">
//         <div className="flex gap-6">
//           <aside className="shrink-0 bg-white p-4">
//             <ProductsSort value={sortOrder} onSortChange={handleSortChange} />
//             <ProductsFilter searchParams={searchParams} setSearchParams={setSearchParams} />
//           </aside>

//           <div className="flex-1 min-w-0 bg-white p-4">
//             {loading ? (
//               <Spinner loading={loading} />
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//                   {sortProducts.map((product) => (
//                     <ProductListing key={product.id} product={product} />
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default ProductsPage;
