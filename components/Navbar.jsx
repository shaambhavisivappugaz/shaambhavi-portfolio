'use client';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import styles from '../styles/Navbar.module.css';

const NAV_LINKS = [
  { href:'#work',        label:'Work' },
  { href:'#experience',  label:'Experience' },
  { href:'#skills',      label:'Skills' },
  { href:'#education',   label:'Education' },
  { href:'#contact',     label:'Contact' },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <nav className={styles.nav}>
        <a href="#" className={styles.logo} onClick={close}>S<span>.</span></a>

        {/* Desktop links */}
        <div className={styles.links}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className={styles.link}>{l.label}</a>
          ))}
          <a href="/Shaambhavi_Sivappugaz_Resume.pdf" download="Shaambhavi_Sivappugaz_Resume.pdf" className={styles.cvBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            CV
          </a>
        </div>

        <div className={styles.right}>
          <button className={styles.themeBtn} onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark'
              ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>

          {/* Hamburger — mobile only */}
          <button
            className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ''}`}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} className={styles.mobileLink} onClick={close}>
            {l.label}
          </a>
        ))}
        <button className={styles.mobilethemeBtn} onClick={toggle}>
          {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
        </button>
      </div>
      {open && <div className={styles.menuOverlay} onClick={close}/>}
    </>
  );
}
