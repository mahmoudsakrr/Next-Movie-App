"use client";
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './Navbar.module.scss';
import ThemeToggle from './ThemeToggle';
import BurgerMenu from './BurgerMenu';
import { useMenuStore } from '../state/menuStore';

const MobileMenu = dynamic(() => import('./MobileMenu'));

const Navbar: React.FC = () => {
  const { open, toggle, close } = useMenuStore();

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo} onClick={close}>
          🎬 MovieApp
        </Link>
        <div className={styles.spacer} />

        {/* Desktop actions */}
        <div className={styles.desktopActions}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/favorites" className={styles.navLink}>
            Favorites
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile burger button */}
        <div className={styles.mobileActions}>
          <BurgerMenu open={open} onClick={toggle} />
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <MobileMenu open={open} />
    </>
  );
};

export default Navbar; 