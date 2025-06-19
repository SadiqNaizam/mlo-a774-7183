import React from 'react';
import PlaybackControls from '@/components/PlaybackControls';

const PlayerFooter: React.FC = () => {
  console.log('PlayerFooter loaded');

  return (
    // bg-background is now transparent via tailwind.config.ts (or use bg-card for different glass layer)
    // For consistency with GlobalHeader, using bg-background.
    <footer className=\"fixed bottom-0 left-0 right-0 z-40 border-t bg-background backdrop-blur-xl border-[hsla(var(--border)/0.1)] supports-[backdrop-filter]:bg-background/80\">\n      <div className=\"container mx-auto px-4 py-3 h-[84px]\">\n        <PlaybackControls />\n      </div>\n    </footer>\n  );\n};\n\nexport default PlayerFooter;\n