import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  const isFavorite = (destinationId) => {
    return favoriteIds.includes(destinationId);
  };

  const addFavorite = (destinationId) => {
    setFavoriteIds((currentFavorites) => {
      if (currentFavorites.includes(destinationId)) {
        return currentFavorites;
      }

      return [...currentFavorites, destinationId];
    });
  };

  const removeFavorite = (destinationId) => {
    setFavoriteIds((currentFavorites) =>
      currentFavorites.filter((id) => id !== destinationId),
    );
  };

  const toggleFavorite = (destinationId) => {
    if (isFavorite(destinationId)) {
      removeFavorite(destinationId);
    } else {
      addFavorite(destinationId);
    }
  };

  const value = {
    favoriteIds,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside a FavoritesProvider");
  }

  return context;
}
