import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.length;

  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const { logout, isLoggedIn } = useAuth();

  return (
    <>
      {/* <!-- navbar --> */}
      <nav className="bg-white border-white-500 z-50 top-0 w-full">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div>
              <Link className="flex flex-shrink-0 items-center mr-4" to="/">
                <span className="hidden md:block text-black text-2xl font-bold ml-2">Kuba_the_Trader_King</span>
              </Link>
            </div>

            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              >
                Home
              </Link>
              {/* <Link
                to="/products"
                className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              >
                Produkty
              </Link> */}
              {/* <Link
                to="/gallery"
                className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              >
                Galeria
              </Link> */}
              <Link
                to="/upload-excel"
                className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              >
                Files
              </Link>
              <Link
                to="/about"
                className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              >
                O nas
              </Link>
            </div>

            <div className="flex space-x-4">
              <div
                className="relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <button
                  className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  onClick={() => navigate('/profile')}
                >
                  <i className="fa-regular fa-user"></i>
                </button>
                {isHovered && (
                  <div className="absolute left-0 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50">
                    {isLoggedIn ? (
                      <>
                        <Link
                          to="profile"
                          className="block px-4 py-2 text-black hover:bg-gray-900 hover:text-white rounded-md"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                        >
                          Profil
                        </Link>
                        <button
                          className="block w-full text-left px-4 py-2 text-black hover:bg-gray-900 hover:text-white rounded-md"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-2"
                          onClick={() => logout()}
                        >
                          Wylogowanie
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="profile"
                          className="block px-4 py-2 text-black hover:bg-gray-900 hover:text-white rounded-md"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                        >
                          Profil
                        </Link>
                        <Link
                          to="login"
                          className="block px-4 py-2 text-black hover:bg-gray-900 hover:text-white rounded-md"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-1"
                        >
                          Logowanie
                        </Link>
                        {/* <Link
                          to="register"
                          className="block px-4 py-2 text-black hover:bg-gray-900 hover:text-white rounded-md"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-2"
                        >
                          Rejestracja
                        </Link> */}
                      </>
                    )}
                  </div>
                )}
              </div>

              <Link
                to="/search"
                className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
              <Link
                to="/favorites"
                className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
              >
                <i className="fa-regular fa-heart"></i>
              </Link>
              {/* <Link
                to="/shop-cart"
                className="text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 relative"
              >
                <i className="fa-solid fa-cart-shopping"></i>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-gray-300 text-white text-[10px] font-bold rounded-full px-2 py-1 h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
