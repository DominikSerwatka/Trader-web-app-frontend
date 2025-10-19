import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

function ShopCartPage() {
  const { cart, removeOneFromCart } = useCart();

  const [totalPrice, setPrice] = useState(0);

  useEffect(() => {
    var totalPrice = 0;
    cart.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    setPrice(totalPrice);
  }, [cart]);

  return (
    <>
      <section className="mt-10 pb-16 px-4 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Twój koszyk</h2>

          <div>
            {cart.length !== 0 ? (
              cart.map((product, index) => {
                return (
                  <div className="flex items-center justify-between border-b pb-4" key={index}>
                    <div className="flex items-center gap-4">
                      <img
                        src={product.picture}
                        alt="Szafa"
                        className="w-24 h-24 object-cover rounded-md shadow"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">Ilość: {product.quantity}</p>
                        <p className="text-sm text-gray-600">Cena: {product.price} zł</p>
                      </div>
                    </div>
                    <button
                      className="text-dark hover:underline text-sm"
                      onClick={() => removeOneFromCart(product.id)}
                    >
                      Usuń
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-xl mb-8">Koszyk jest pusty</p>
            )}
          </div>
          <div>
            {cart.length !== 0 ? (
              <div className="mt-10 pt-6 flex flex-col items-end">
                <p className="text-lg font-semibold mb-2">
                  Suma: <span className="text-dark">{totalPrice} zł</span>
                </p>

                <Link
                  to="/checkout/orderring"
                  className="inline-block bg-white text-dark px-4 py-2 rounded-md hover:bg-gray-200 border border-black transition"
                >
                  Przejdź do dostawy
                </Link>
              </div>
            ) : (
              <Link
                to="/"
                className="inline-block bg-white text-dark px-4 py-2 rounded-md hover:bg-gray-200 border border-black transition"
              >
                Wroć do zakupów
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ShopCartPage;
