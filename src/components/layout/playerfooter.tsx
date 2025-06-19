import React from 'react';
import PlaybackControls from '@/components/PlaybackControls'; // Assuming this component exists as per already-generated-components

const PlayerFooter: React.FC = () => {
  console.log('PlayerFooter loaded');

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 h-[84px]"> {/* Standard Spotify-like player height */}
        <PlaybackControls />
      </div>
    </footer>
  );
};

export default PlayerFooter;