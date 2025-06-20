"use client";
import React from 'react';
import { useFavoritesStore } from '@/state/favoritesStore';
import styles from '../page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const NO_POSTER_PLACEHOLDER = process.env.NO_POSTER_PLACEHOLDER;
  return (
    <main className={styles.page}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Favorite Movies</h1>
      <AnimatePresence>
        <div className={styles.grid}>
          {favorites.length === 0 && (
            <div style={{ textAlign: 'center', opacity: 0.7, width: '100%' }}>
              No favorite movies yet.
            </div>
          )}
          {favorites.map((movie) => (
            <motion.div
              key={movie.imdbID}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'} alt={movie.Title} className={styles.poster} width={220} height={320}/>
              <div className={styles.cardContent}>
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
                {movie.imdbRating && <p><strong>Rating:</strong> {movie.imdbRating}</p>}
                <button
                  className={styles.favActive}
                  onClick={() => removeFavorite(movie.imdbID)}
                >
                  ★ Remove Favorite
                </button>
                <Link href={`/movie/${movie.imdbID}`} className={styles.detailsBtn}>
                  Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </main>
  );
} 