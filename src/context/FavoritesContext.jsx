import React from 'react';
import { createContext } from 'react';
import { useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';

const FavoriteContext = createContext();

function FavoritesProvider({ children }) {
  const { user, isLoggedIn } = useAuth();

  const storageKey = useMemo(
    () => (isLoggedIn ? `favorites_${user.email}` : 'favorites_guest'),
    [isLoggedIn, user?.email]
  );

  const loadFavorites = (key) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  };

  const [favorites, setFavorites] = useState(() => {
    return loadFavorites(storageKey);
  });

  useEffect(() => {
    setFavorites(loadFavorites(storageKey));
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey]);

  const favoriteClick = (favorite) => {
    setFavorites((prevFavorites) => {
      const existingFavorite = prevFavorites.find((p) => p.id === favorite.id);
      if (existingFavorite) {
        return prevFavorites.filter((p) => p.id !== favorite.id);
      } else {
        return [...prevFavorites, favorite];
      }
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, favoriteClick }}>
      {children}
    </FavoriteContext.Provider>
  );
}

const useFavorites = () => useContext(FavoriteContext);

export { useFavorites, FavoritesProvider };

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
