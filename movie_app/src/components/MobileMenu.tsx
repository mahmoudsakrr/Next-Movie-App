"use client";
import React from 'react';
import Link from 'next/link';
import { useMenuStore } from '../state/menuStore';
import ThemeToggle from './ThemeToggle';
import styles from './MobileMenu.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const MobileMenu: React.FC<{ open: boolean }> = ({ open }) => {
  const { close } = useMenuStore();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className={styles.menuContent}>
            <Link href="/" className={styles.mobileLink} onClick={close}>
              Home
            </Link>
            <Link href="/favorites" className={styles.mobileLink} onClick={close}>
              Favorites
            </Link>
            <div className={styles.themeToggleWrapper}>
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 