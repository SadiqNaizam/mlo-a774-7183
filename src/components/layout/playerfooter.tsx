import React from 'react';
import PlaybackControls from '@/components/PlaybackControls';

const PlayerFooter: React.FC = () => {
  console.log('PlayerFooter loaded');

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background backdrop-blur-lg supports-[backdrop-filter]:bg-background"> {/* Applied backdrop-blur-lg, bg-background now controls alpha */}
      <div className="container mx-auto px-4 py-3 h-[84px]"> {/* Standard Spotify-like player height */}
        <PlaybackControls />
      </div>
    </footer>
  );
};

export default PlayerFooter;