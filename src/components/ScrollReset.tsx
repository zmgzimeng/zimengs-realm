'use client';

import { useEffect } from 'react';

export default function ScrollReset() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const hash = window.location.hash;

    if (hash) {
      requestAnimationFrame(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'auto' });
        }
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
