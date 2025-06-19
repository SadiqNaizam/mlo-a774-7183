import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import GlobalHeader from '@/components/layout/GlobalHeader';
import NavigationSidebar from '@/components/layout/NavigationSidebar';
import PlayerFooter from '@/components/layout/PlayerFooter';
import TrackListItem from '@/components/TrackListItem';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
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
    // Overall page bg is transparent, relies on body's bg-background (now semi-transparent)
    <div className="bg-transparent text-foreground min-h-screen">
      <GlobalHeader />
      <NavigationSidebar />
      
      {/* Main content area uses semi-transparent background and backdrop-blur */}
      <main className="ml-0 sm:ml-60 pt-16 pb-[88px] bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-transparent">
        <ScrollArea className="h-[calc(100vh_-_64px_-_88px)]">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <section className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 mb-8 
                                 p-6 rounded-lg bg-card/70 backdrop-blur-sm supports-[backdrop-filter]:bg-transparent"> {/* Header section with glass effect */}
              <img
                src={samplePlaylist.coverArtUrl}
                alt={`${samplePlaylist.title} Cover Art`}
                className="w-48 h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 object-cover rounded-lg shadow-2xl aspect-square"
              />
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Playlist</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold my-1 text-primary">
                  {samplePlaylist.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-2 mb-3 max-w-xl">
                  {samplePlaylist.description}
                </p>
                <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground mb-4">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={samplePlaylist.creatorImageUrl} alt={samplePlaylist.creator} />
                    <AvatarFallback className="bg-muted"><Music className="h-3 w-3" /></AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-foreground">{samplePlaylist.creator}</span>
                  <span className="mx-1.5">•</span> {samplePlaylist.trackCount} songs
                  <span className="mx-1.5">•</span> {samplePlaylist.totalDuration}
                </div>
                <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button size="lg" onClick={handlePlayAll} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3">
                    <PlayIcon className="mr-2 h-5 w-5 fill-primary-foreground" /> Play All
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleShufflePlay} className="px-6 py-3 border-border hover:bg-muted/70 text-foreground">
                    <ShuffleIcon className="mr-2 h-5 w-5" /> Shuffle
                  </Button>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <div className="border-t border-border pt-4 space-y-1">
                {sampleTracks.length > 0 ? (
                  sampleTracks.map((track, index) => (
                    <TrackListItem
                      key={track.id}
                      id={track.id}
                      coverArtUrl={track.coverArtUrl}
                      title={track.title}
                      artist={track.artist}
                      album={track.album}
                      duration={duration}
                      onPlay={handlePlayTrack}
                      isCurrentTrack={index === 0 && false} 
                      isPlaying={index === 0 && false}
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-10">This playlist is currently empty. Add some songs!</p>
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