import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import GlobalHeader from '@/components/layout/GlobalHeader';
import NavigationSidebar from '@/components/layout/NavigationSidebar';
import PlayerFooter from '@/components/layout/PlayerFooter';
import TrackListItem from '@/components/TrackListItem'; // Is glass

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button'; // bg-primary is glass
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Play as PlayIcon, Shuffle as ShuffleIcon, Music } from 'lucide-react';

const samplePlaylist = {
  id: 'doraemon-gadget-grooves',
  title: "Doraemon's Gadget Grooves",
  description: "A collection of upbeat and futuristic tunes perfect for any adventure with Doraemon and Nobita! Inspired by the gadgets and fun of the series.",
  creator: "DoraMusic Curators",
  creatorImageUrl: "https://avatar.iran.liara.run/public/boy?username=DoraMusic",
  coverArtUrl: "https://picsum.photos/seed/doraemonplaylist/400/400", 
  trackCount: 3,
  totalDuration: "10m 30s",
};

const sampleTracks = [
  { id: 'track1', coverArtUrl: 'https://picsum.photos/seed/gadgetfunk/80/80', title: 'Pocket Symphony', artist: 'The Gadgeteers', album: 'Future Sounds', duration: '3:30' },
  { id: 'track2', coverArtUrl: 'https://picsum.photos/seed/doorbeats/80/80', title: 'Anywhere Door Beats', artist: 'DJ Noby', album: 'Time Travels', duration: '4:00' },
  { id: 'track3', coverArtUrl: 'https://picsum.photos/seed/coptergroove/80/80', title: 'Hopter Hues', artist: 'Gian & Sunne', album: 'Open Skies', duration: '3:00' },
];

const PlaylistDetailPage: React.FC = () => {
  console.log('PlaylistDetailPage loaded');

  const handlePlayTrack = (trackId: string) => {
    console.log(`Request to play track: ${trackId} from playlist: ${samplePlaylist.title}`);
  };

  const handlePlayAll = () => {
    console.log(`Request to play all tracks from playlist: ${samplePlaylist.title}`);
  };

  const handleShufflePlay = () => {
    console.log(`Request to shuffle play playlist: ${samplePlaylist.title}`);
  };

  return (
    // Main bg-background provides the base for the page.
    <div className="bg-background text-foreground min-h-screen">
      <GlobalHeader />
      <NavigationSidebar />
      
      <main className="ml-0 sm:ml-60 pt-16 pb-[88px]">
        <ScrollArea className="h-[calc(100vh_-_64px_-_88px)]">
          {/* Playlist Header can be a glass panel itself */}
          <section className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 mb-8 p-6 bg-card/40 backdrop-blur-lg border-b border-[hsla(var(--border)/0.1)] rounded-b-xl shadow-lg mx-4 md:mx-auto md:max-w-5xl lg:max-w-6xl mt-4">
            <img
              src={samplePlaylist.coverArtUrl}
              alt={`${samplePlaylist.title} Cover Art`}
              className="w-48 h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 object-cover rounded-lg shadow-2xl aspect-square border-2 border-white/20"
            />
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Playlist</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold my-1 text-primary dark:text-primary">
                {samplePlaylist.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-2 mb-3 max-w-xl">
                {samplePlaylist.description}
              </p>
              <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground mb-4">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={samplePlaylist.creatorImageUrl} alt={samplePlaylist.creator} />
                  <AvatarFallback className="bg-muted backdrop-blur-sm"><Music className="h-3 w-3" /></AvatarFallback>
                </Avatar>
                <span className="font-semibold text-foreground">{samplePlaylist.creator}</span>
                <span className="mx-1.5">•</span> {samplePlaylist.trackCount} songs
                <span className="mx-1.5">•</span> {samplePlaylist.totalDuration}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                {/* Buttons use bg-primary or bg-card (for outline) which are now transparent */}
                <Button size="lg" onClick={handlePlayAll} className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 backdrop-blur-sm shadow-md">
                  <PlayIcon className="mr-2 h-5 w-5 fill-primary-foreground" /> Play All
                </Button>
                <Button size="lg" variant="outline" onClick={handleShufflePlay} className="px-6 py-3 backdrop-blur-sm border-primary/50 hover:bg-primary/20 text-primary">
                  <ShuffleIcon className="mr-2 h-5 w-5" /> Shuffle
                </Button>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <section className="mt-8">
              {/* Track list items are already glassmorphic */}
              <div className="border-t border-[hsla(var(--border)/0.1)] pt-4 space-y-1">
                {sampleTracks.length > 0 ? (
                  sampleTracks.map((track, index) => (
                    <TrackListItem
                      key={track.id} {...track} onPlay={handlePlayTrack}
                      isCurrentTrack={index === 0 && false} isPlaying={index === 0 && false}
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-10 p-4 bg-card backdrop-blur-sm rounded-md border border-[hsla(var(--border)/0.1)]">This playlist is currently empty.</p>
                )}
              </div>
            </section>
          </div>
        </ScrollArea>
      </main>
      <PlayerFooter />
    </div>
  );
};

export default PlaylistDetailPage;