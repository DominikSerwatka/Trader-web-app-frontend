import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function ProfilePage() {
  const { isLoggedIn, user } = useAuth();

  if (isLoggedIn) {
    return (
      <section className="pt-10 bg-gray-50 min-h-screen px-4 pb-20">
        <div className="max-w-6xl mx-auto bg-white rounded-md shadow flex">
          <aside className="w-1/4 border-r p-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Witaj, {user.name}</h2>
            <nav className="py-1">
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `block w-full text-left px-3 py-3 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-medium' : ''}`
                }
              >
                Moje zamówienia
              </NavLink>
              <NavLink
                to="/returns"
                className={({ isActive }) =>
                  `block w-full text-left px-3 py-3 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-medium' : ''}`
                }
              >
                Zwroty i reklamacje
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block w-full text-left px-3 py-3 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-medium' : ''}`
                }
              >
                Ustawienia konta
              </NavLink>
              <NavLink
                to="/payments"
                className={({ isActive }) =>
                  `block w-full text-left px-3 py-3 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-medium' : ''}`
                }
              >
                Adresy i płatności
              </NavLink>
              <NavLink
                to="/opinions"
                className={({ isActive }) =>
                  `block w-full text-left px-3 py-3 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-medium' : ''}`
                }
              >
                Opinie
              </NavLink>
            </nav>
          </aside>

          <main className="w-3/4 p-6">
            <Outlet />
          </main>
        </div>
      </section>
    );
  } else {
    return (
      <section className="pt-10 bg-white px-4">
        <h2 className="text-xl font-bold text-center">Użytkownik nie jest zalogowany</h2>
      </section>
    );
  }
}

export default ProfilePage;
