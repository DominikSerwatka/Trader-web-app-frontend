import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CheckoutMainLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isSelected = 'font-bold text-gray-600';
  const isSelectedBorder = 'border-b-2 border-gray-600';

  var checkoutClasses = {
    '/checkout/orderring': ['font-bold text-gray-400', 'text-center flex-1'],
    '/checkout/summary': ['font-bold text-gray-400', 'text-center flex-1'],
  };

  checkoutClasses[currentPath][0] = isSelected;
  checkoutClasses[currentPath][1] += ` ${isSelectedBorder}`;

  return (
    <nav className="bg-white border-white-500 z-50 top-0 w-full">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div>
            <Link className="flex flex-shrink-0 items-center mr-4" to="/">
              <span className="hidden md:block text-black text-2xl font-bold ml-2">Meble</span>
            </Link>
          </div>
          <div className="text-center flex-1">
            <span className="font-bold text-gray-400">1. Koszyk</span>
          </div>
          <div className={checkoutClasses['/checkout/orderring'][1]}>
            <span className={checkoutClasses['/checkout/orderring'][0]}>2. Dostawa i płatność</span>
          </div>
          <div className={checkoutClasses['/checkout/summary'][1]}>
            <span className={checkoutClasses['/checkout/summary'][0]}>3. Podsumowanie</span>
          </div>
        </div>
        <div className="mt-10 max-w-3xl mx-auto">
          <Outlet />
        </div>
      </div>
    </nav>
  );
}

export default CheckoutMainLayout;
