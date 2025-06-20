"use client";
import { useEffect } from 'react';
import { useThemeStore } from '../state/themeStore';

const ThemeEffect = () => {
  const theme = useThemeStore((s) => s.theme);
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);
  return null;
};

export default ThemeEffect; 