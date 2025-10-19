import React, { useEffect, useContext, useRef, useState, createContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
  const [user, setUser] = useState(null);

  const API = "http://localhost:8000";
  const base = API || '/api';

  // 1) Single-flight na refresh:
  const refreshPromiseRef = useRef(null);

  // 3) Strażnik na podwójny efekt w dev/StrictMode:
  const didInitRef = useRef(false);

  useEffect(() => {
    if (!accessToken) {
      setUser(null);
      return;
    }
    if (didInitRef.current) return; // uniknij podwójnego fetchu na mount
    didInitRef.current = true;
    fetchUser();
  }, [accessToken]);

  const refreshToken = async () => {
    // jeśli refresh już trwa, poczekaj na tę samą obietnicę
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }
    refreshPromiseRef.current = (async () => {
      const res = await fetch(`${base}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      console.log('Refreshing token, response status:', res.status);
      if (!res.ok) {
        return null; // ważne: nie wywołujemy logout tutaj
      }
      const data = await res.json();
      const newTok = data.access_token;
      setAccessToken(newTok);
      localStorage.setItem('accessToken', newTok);
      return newTok;
    })();

    try {
      return await refreshPromiseRef.current;
    } finally {
      refreshPromiseRef.current = null;
    }
  };

  // Wspólny helper z retry po 401 (użyjemy go w fetchUser, ale możesz też w całej appce)
  const fetchWithAuth = async (input, init = {}, { retry = true } = {}) => {
    const token = accessToken;
    const res = await fetch(input, {
      ...init,
      credentials: 'include',
      headers: {
        ...(init.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (res.status !== 401 || !retry) return res;

    console.log('401 detected, trying refresh...');
    const newTok = await refreshToken();
    if (!newTok) {
      // brak refreshu – zostaw kontrolę wyżej, ale NIE rób tutaj logout
      return res;
    }

    // powtórz żądanie z nowym tokenem
    return fetch(input, {
      ...init,
      credentials: 'include',
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${newTok}`,
      },
    });
  };

  const fetchUser = async () => {
    try {
      const response = await fetchWithAuth(`${base}/users/me`, {}, { retry: true });

      console.log('Fetching /users/me, status:', response.status);

      if (!response.ok) {
        // jeżeli wciąż nie 200 po próbie refreshu – NIE rób automatycznego logoutu
        // To może być chwilowy problem; UI może pokazać ekran logowania gdy user === null.
        console.warn('Failed to fetch user after refresh attempt.');
        return null;
      }

      const data = await response.json();
      setUser(data);
      console.log('User fetched:', data);
      return data;
    } catch (err) {
      console.error('fetchUser fatal error:', err);
      // 2) Nie wylogowuj agresywnie – pozwól UI zareagować
      return null;
    }
  };

  const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${base}/auth/token`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) return false;

    const data = await response.json();
    setAccessToken(data.access_token);
    localStorage.setItem('accessToken', data.access_token);
    // wyczyść strażnik, aby po zalogowaniu wykonać pojedynczy fetchUser
    didInitRef.current = false;
    return true;
  };

  const register = async (registerData) => {
    const response = await fetch(`${base}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    });
    return response.ok;
  };

  const logout = async () => {
    await fetch(`${base}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    didInitRef.current = false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        register,
        refreshToken, // opcjonalnie udostępniony
        fetchWithAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
