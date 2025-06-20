import React from 'react';
import styles from './SkeletonCard.module.scss';

const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.poster} />
      <div className={styles.content}>
        <div className={styles.title} />
        <div className={styles.text} />
        <div className={styles.buttons} />
      </div>
    </div>
  );
};

export default SkeletonCard; 