// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useCheckout } from '../context/CheckoutContext.jsx';
// import { useOrders } from '../context/OrdersContext.jsx';
// import { useCart } from '../context/CartContext.jsx';

// function CheckoutSummaryPage() {

//   const navigate = useNavigate();

//   const { checkoutData } = useCheckout();

//   const { addOrder } = useOrders();

//   const { clearCart } = useCart();
  
//   const submitOrder = async () => {
//     console.log('Submitting order with data:', checkoutData);
//     await addOrder(checkoutData.order);
//     clearCart();
//     navigate('/orders');
//   }

//   return (
//     <>
//       <h2 className="text-2xl font-bold mb-6 text-center">Podsumowanie zamówienia</h2>
//       <section className="bg-gray-50 shadow rounded-lg p-6 mb-6 border">
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Dane osobowe</h3>
//             <p>
//               {checkoutData.order.delivery_address_snapshot.name} {checkoutData.order.delivery_address_snapshot.last_name}
//             </p>
//             <p>{checkoutData.order.delivery_address_snapshot.email}</p>
//             <p>{checkoutData.order.delivery_address_snapshot.phone_number}</p>
//             <p>
//               {checkoutData.order.delivery_address_snapshot.street} {checkoutData.order.delivery_address_snapshot.house_number}, {checkoutData.order.delivery_address_snapshot.postal_code} {checkoutData.order.delivery_address_snapshot.city}
//             </p>
//           </div>
//           <Link
//             to="/checkout/orderring"
//             className="border p-2 rounded-md hover:bg-gray-100 border-black"
//           >
//             Zmień
//           </Link>
//         </div>
//       </section>

//       <section className="bg-gray-50 shadow rounded-lg p-6 mb-6 border">
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Dostawa</h3>
//             <p>{checkoutData.order.delivery_fee} delivery</p>
//           </div>
//           <Link
//             to="/checkout/orderring"
//             className="border p-2 rounded-md hover:bg-gray-100 border-black"
//           >
//             Zmień
//           </Link>
//         </div>
//       </section>

//       <section className="bg-gray-50 shadow rounded-lg p-6 mb-6 border">
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Płatność</h3>
//             <p>{checkoutData.order.payment_method}</p>
//           </div>
//           <Link
//             to="/checkout/orderring"
//             className="border p-2 rounded-md hover:bg-gray-100 border-black"
//           >
//             Zmień
//           </Link>
//         </div>
//       </section>

//       <div className="flex justify-between items-center mt-10">
//         <Link
//           to="/checkout/orderring"
//           className="inline-block bg-white text-dark px-4 py-2 rounded-md hover:bg-gray-200 border border-black transition"
//         >
//           Wróć do dostawy
//         </Link>

//         <button
//           onClick={() => submitOrder()}
//           type="submit"
//           className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
//         >
//           Zapłać i złóż zamówienie
//         </button>
//       </div>
//     </>
//   );
// }

// export default CheckoutSummaryPage;
