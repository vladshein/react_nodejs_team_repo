import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../redux/auth/selectors';

const API_BASE = import.meta.env.VITE_API_URL;

export const useFavoriteRecipe = (recipeId) => {
  const user = useSelector(selectUserInfo);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // check favorite
  useEffect(() => {
    if (!user?.token || !recipeId) return;

    const checkFavorite = async () => {
      try {
        const res = await fetch(`${API_BASE}recipes/favorites`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to load favorites');

        const data = await res.json();
        setIsFavorite(data.some((item) => item.id === recipeId));
      } catch (err) {
        console.error(err);
      }
    };

    checkFavorite();
  }, [recipeId, user?.token]);

  // toggle
  const toggleFavorite = useCallback(async () => {
    if (!user?.token || !recipeId) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}recipes/favorites/${recipeId}`, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) throw new Error('Favorite action failed');

      setIsFavorite((prev) => !prev);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [isFavorite, recipeId, user?.token]);

  return {
    isFavorite,
    toggleFavorite,
    loading,
  };
};
