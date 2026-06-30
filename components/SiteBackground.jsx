'use client';
import { lazy, Suspense } from 'react';
import { useTheme } from '@/context/ThemeContext';

const CinematicLayer = lazy(() => import('./CinematicLayer'));


export default function SiteBackground() {
  const { theme } = useTheme();
  if (theme !== 'dark') return null;
  return (
    <Suspense fallback={null}>
      <CinematicLayer />
    </Suspense>
  );
}
