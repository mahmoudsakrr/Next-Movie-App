"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetcher } from '@/utils/fetcher';
import { useFavoritesStore } from '@/state/favoritesStore';
import { useParams } from 'next/navigation';
import styles from './MovieDetails.module.scss';
import { motion } from 'framer-motion';

const NO_POSTER_PLACEHOLDER: string = process.env.NO_POSTER_PLACEHOLDER || '';

export default function MovieDetailsPage() {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  useEffect(() => {
    if (!imdbID) return;
    setLoading(true);
    setError('');
    fetcher({ params: { i: imdbID } })
      .then(setMovie)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [imdbID]);

  if (loading) return <div className={styles.center}>Loading...</div>;
  if (error) return <div className={styles.center} style={{ color: 'red' }}>{error}</div>;
  if (!movie) return <div className={styles.center}>Movie not found.</div>;

  return (
    <motion.div className={styles.details} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Image
        src={movie.Poster !== 'N/A' ? movie.Poster : NO_POSTER_PLACEHOLDER}
        alt={movie.Title}
        className={styles.poster}
        width={220}
        height={320}
      />
      <div className={styles.info}>
        <h1>{movie.Title} ({movie.Year})</h1>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>Rating:</strong> {movie.imdbRating || 'N/A'}</p>
        <button
          className={isFavorite(movie.imdbID) ? styles.favActive : styles.favBtn}
          onClick={() => isFavorite(movie.imdbID) ? removeFavorite(movie.imdbID) : addFavorite({
            imdbID: movie.imdbID,
            Title: movie.Title,
            Poster: movie.Poster,
            Year: movie.Year,
            imdbRating: movie.imdbRating
          })}
        >
          {isFavorite(movie.imdbID) ? '★ Remove Favorite' : '☆ Add to Favorites'}
        </button>
      </div>
    </motion.div>
  );
} 