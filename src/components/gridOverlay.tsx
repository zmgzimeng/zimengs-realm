'use client';

import { useState, useEffect } from 'react';

export default function GridOverlay() {
  const [showGrid, setShowGrid] = useState(false);

  // Toggle grid with G
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'g' || e.key === 'G') {
        setShowGrid((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!showGrid) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="grid grid-cols-12 gap-4 h-full w-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="bg-blue-500/10 border-x border-blue-500/20 h-full flex items-start justify-center pt-2 text-[10px] text-blue-400/50 font-mono"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
