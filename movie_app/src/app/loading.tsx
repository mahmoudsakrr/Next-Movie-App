import SkeletonCard from '@/components/SkeletonCard';
import styles from '@/app/page.module.css';

export default function Loading() {
  return (
    <main className={styles.page}>
      <div className={styles.grid}>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </main>
  );
} 