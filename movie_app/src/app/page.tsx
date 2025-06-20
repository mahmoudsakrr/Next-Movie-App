"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetcher } from '../utils/fetcher';
import { useFavoritesStore, Movie } from '../state/favoritesStore';
import styles from './page.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import SkeletonCard from '@/components/SkeletonCard';

const RANDOM_TITLES = [
  'Inception', 'The Matrix', 'Interstellar', 'Titanic', 'Avatar',
  'The Godfather', 'Pulp Fiction', 'Forrest Gump', 'Gladiator', 'Joker',
  'Avengers', 'Fight Club', 'The Dark Knight', 'Shrek', 'Toy Story'
];

const NO_POSTER_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="140" height="210" viewBox="0 0 140 210"%3E%3Crect width="140" height="210" fill="%23cccccc" /%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14px" fill="%23888888"%3ENo Poster%3C/text%3E%3C/svg%3E';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const handleAddFavorite = async (movie: Movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
      return;
    }
    try {
      const fullDetails = await fetcher({ params: { i: movie.imdbID } });
      addFavorite({ ...movie, imdbRating: fullDetails.imdbRating });
    } catch (err) {
      console.error("Failed to fetch details for favorite", err);
      addFavorite(movie);
    }
  };

  useEffect(() => {
    // On mount, fetch random movies
    (async () => {
      setLoading(true);
      setError('');
      try {
        // Pick 5 random titles
        const shuffled = RANDOM_TITLES.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        const results = await Promise.all(selected.map(title =>
          fetcher({ params: { s: title, type: 'movie' } })
        ));
        // Flatten and dedupe by imdbID
        const all = results.flatMap(r => r.Search || []);
        const unique = Array.from(new Map(all.map(m => [m.imdbID, m])).values());
        setMovies(unique);
      } catch (err: any) {
        setError('Failed to load random movies');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await fetcher({ params: { s: query, type: 'movie' } });
      setMovies(data.Search || []);
    } catch (err: any) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className={styles.search}
        />
        <button type="submit" className={styles.searchBtn} disabled={loading || !query.trim()}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <div style={{ color: 'red', textAlign: 'center', fontSize: '3rem' }}>{error}</div>}
      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <div className={styles.grid}>
            {movies.map((movie) => (
              <motion.div
                key={movie.imdbID}
                className={styles.card}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={movie.Poster !== 'N/A' ? movie.Poster : NO_POSTER_PLACEHOLDER}
                  alt={movie.Title}
                  className={styles.poster}
                  width={140}
                  height={210}
                />
                <div className={styles.cardContent}>
                  <h2>{movie.Title}</h2>
                  <p>{movie.Year}</p>
                  <button
                    className={isFavorite(movie.imdbID) ? styles.favActive : styles.favBtn}
                    onClick={() => handleAddFavorite(movie)}
                  >
                    {isFavorite(movie.imdbID) ? '★ Remove Favorite' : '☆ Add to Favorites'}
                  </button>
                  <Link href={`/movie/${movie.imdbID}`} className={styles.detailsBtn}>
                    Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </main>
  );
}
