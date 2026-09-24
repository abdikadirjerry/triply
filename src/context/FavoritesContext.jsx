import { useCallback, useEffect, useMemo, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";

const STORAGE_KEY = "triply-favorites";

function getInitialFavorites() {
  try {
    const storedFavorites = localStorage.getItem(STORAGE_KEY);

    if (!storedFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(storedFavorites);

    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(getInitialFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = useCallback((destinationId) => {
    setFavoriteIds((currentIds) => {
      if (currentIds.includes(destinationId)) {
        return currentIds.filter((id) => id !== destinationId);
      }

      return [...currentIds, destinationId];
    });
  }, []);

  const isFavorite = useCallback(
    (destinationId) => {
      return favoriteIds.includes(destinationId);
    },
    [favoriteIds],
  );

  const removeFavorite = useCallback((destinationId) => {
    setFavoriteIds((currentIds) =>
      currentIds.filter((id) => id !== destinationId),
    );
  }, []);

  const value = useMemo(
    () => ({
      favoriteIds,
      toggleFavorite,
      isFavorite,
      removeFavorite,
    }),
    [favoriteIds, toggleFavorite, isFavorite, removeFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
