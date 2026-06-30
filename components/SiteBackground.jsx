'use client';
import { lazy, Suspense } from 'react';
import { useTheme } from '@/context/ThemeContext';

const CinematicLayer = lazy(() => import('./CinematicLayer'));

/* Renders the animated starfield as a fixed, full-page background that
   stays alive behind every section as the user scrolls — not just inside
   the hero. Only shown in dark theme, where it reads correctly. */
export default function SiteBackground() {
  const { theme } = useTheme();
  if (theme !== 'dark') return null;
  return (
    <Suspense fallback={null}>
      <CinematicLayer />
    </Suspense>
  );
}
