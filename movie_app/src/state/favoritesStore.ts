import { create } from 'zustand';

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  imdbRating?: string;
}

interface FavoritesState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (imdbID: string) => void;
  isFavorite: (imdbID: string) => boolean;
}

const FAVORITES_KEY = 'favorites';

const getInitialFavorites = (): Movie[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) return JSON.parse(stored);
  }
  return [];
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: typeof window === 'undefined' ? [] : getInitialFavorites(),
  addFavorite: (movie) => set((state) => {
    const updated = [...state.favorites, movie];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return { favorites: updated };
  }),
  removeFavorite: (imdbID) => set((state) => {
    const updated = state.favorites.filter((m) => m.imdbID !== imdbID);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return { favorites: updated };
  }),
  isFavorite: (imdbID) => get().favorites.some((m) => m.imdbID === imdbID),
})); 