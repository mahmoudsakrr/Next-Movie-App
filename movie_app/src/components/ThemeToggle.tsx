import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../state/themeStore';
import styles from './ThemeToggle.module.scss';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return (
    <button
      className={styles.toggle}
      aria-label="Toggle light/dark mode"
      onClick={toggleTheme}
    >
      {theme === 'dark' ?  '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle; 