import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import GlobalHeader from '@/components/layout/GlobalHeader';
import NavigationSidebar from '@/components/layout/NavigationSidebar';
import PlayerFooter from '@/components/layout/PlayerFooter';

import TrackListItem from '@/components/TrackListItem';
import MediaItemCard from '@/components/MediaItemCard';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/components/ui/use-toast";

import { Search as SearchIcon, Music, ListMusic, User, Disc3 } from 'lucide-react';

interface SampleTrack {
  id: string;
  coverArtUrl: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
}

interface SampleMediaItem {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  itemType: 'artist' | 'playlist' | 'album';
}

const placeholderTracks: SampleTrack[] = [
  { id: 'track-1', coverArtUrl: 'https://via.placeholder.com/40/007BFF/FFFFFF?Text=S1', title: 'Dream Chaser', artist: 'Leo', album: 'Galaxy Tunes', duration: '3:45' },
  { id: 'track-2', coverArtUrl: 'https://via.placeholder.com/40/28A745/FFFFFF?Text=S2', title: 'Midnight Groove', artist: 'Mia', duration: '4:12' },
  { id: 'track-3', coverArtUrl: 'https://via.placeholder.com/40/FFC107/000000?Text=S3', title: 'Retro Wave', artist: 'Nova', album: 'Future Past', duration: '2:58' },
];

const placeholderArtists: SampleMediaItem[] = [
  { id: 'artist-1', imageUrl: 'https://via.placeholder.com/150/6F42C1/FFFFFF?Text=Art1', title: 'The Cosmic Keys', subtitle: 'Artist', itemType: 'artist' },
  { id: 'artist-2', imageUrl: 'https://via.placeholder.com/150/DC3545/FFFFFF?Text=Art2', title: 'Echo Bloom', subtitle: 'Artist', itemType: 'artist' },
];

const placeholderAlbums: SampleMediaItem[] = [
  { id: 'album-1', imageUrl: 'https://via.placeholder.com/150/17A2B8/FFFFFF?Text=Alb1', title: 'Neon Skyline', subtitle: 'The Cosmic Keys', itemType: 'album' },
  { id: 'album-2', imageUrl: 'https://via.placeholder.com/150/FD7E14/FFFFFF?Text=Alb2', title: 'Daybreak Hues', subtitle: 'Echo Bloom', itemType: 'album' },
];

const placeholderPlaylists: SampleMediaItem[] = [
  { id: 'playlist-1', imageUrl: 'https://via.placeholder.com/150/20C997/FFFFFF?Text=Pl1', title: 'Doraemon\'s Pocket Mix', subtitle: 'Playlist', itemType: 'playlist' },
  { id: 'playlist-2', imageUrl: 'https://via.placeholder.com/150/E83E8C/FFFFFF?Text=Pl2', title: 'Gadget Grooves', subtitle: 'Playlist', itemType: 'playlist' },
];


const SearchPage = () => {
  console.log('SearchPage loaded');
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      console.log(`Searching for: ${searchQuery}`);
    }
  }, [searchQuery]);

  const handlePlayTrack = (trackId: string) => {
    console.log(`Play track requested from SearchPage: ${trackId}`);
    toast({
      title: "Playback Action",
      description: `Play track ${trackId} requested. (Playback not implemented on this page)`,
    });
  };

  const renderSectionHeader = (title: string, icon?: React.ElementType) => (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground flex items-center">
        {icon && React.createElement(icon, { className: "mr-2 h-6 w-6 text-primary" })}
        {title}
      </h2>
    </div>
  );

  return (
    <div className="relative flex flex-col h-screen bg-transparent"> {/* bg-transparent to show body's bg-background */}
      <GlobalHeader />
      <div className="flex flex-1 overflow-hidden pt-16">
        <NavigationSidebar />
        {/* Main content with semi-transparent gradient and blur */}
        <main className="flex-1 overflow-y-auto sm:ml-60 pb-[88px] 
                         bg-gradient-to-b from-muted/30 via-background/50 to-background/70 
                         dark:from-neutral-800/70 dark:via-neutral-900/60 dark:to-neutral-950/50 
                         backdrop-blur-md supports-[backdrop-filter]:bg-transparent">
          <ScrollArea className="h-full">
            <div className="px-4 py-6 md:px-6 lg:px-8 text-foreground">
              <section className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Search</h1>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="What do you want to listen to?"
                    className="pl-10 pr-4 py-3 text-base h-12 rounded-full bg-input backdrop-blur-sm border-border focus:bg-card focus:ring-primary text-foreground placeholder:text-muted-foreground"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </section>

              <Tabs defaultValue="all" className="w-full">
                {/* TabsList uses bg-muted (semi-transparent) and backdrop-blur */}
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6 bg-muted p-1 rounded-md backdrop-blur-sm">
                  <TabsTrigger value="all" className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-card/70 backdrop-blur-sm">All</TabsTrigger>
                  <TabsTrigger value="tracks" className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-card/70 backdrop-blur-sm">Tracks</TabsTrigger>
                  <TabsTrigger value="artists" className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-card/70 backdrop-blur-sm">Artists</TabsTrigger>
                  <TabsTrigger value="albums" className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-card/70 backdrop-blur-sm">Albums</TabsTrigger>
                  <TabsTrigger value="playlists" className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-card/70 backdrop-blur-sm">Playlists</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  {searchQuery === '' && <p className="text-center text-muted-foreground mt-10">Search for your favorite music!</p>}
                  {searchQuery !== '' && (
                    <>
                      {placeholderTracks.length > 0 && (
                        <section className="mb-8">
                          {renderSectionHeader('Top Tracks', Music)}
                          <div className="space-y-1">
                            {placeholderTracks.slice(0, 3).map(track => (
                              <TrackListItem
                                key={track.id}
                                {...track}
                                onPlay={() => handlePlayTrack(track.id)}
                              />
                            ))}
                          </div>
                        </section>
                      )}
                      {placeholderArtists.length > 0 && (
                         <section className="mb-8">
                          {renderSectionHeader('Top Artists', User)}
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {placeholderArtists.slice(0,3).map(item => <MediaItemCard key={item.id} {...item} itemId={item.id} />)}
                          </div>
                        </section>
                      )}
                    </>
                  )}
                </TabsContent>

                <TabsContent value="tracks">
                  {renderSectionHeader('Tracks', Music)}
                  {searchQuery === '' && <p className="text-center text-muted-foreground mt-10">Enter a search term to find tracks.</p>}
                  {searchQuery !== '' && placeholderTracks.length > 0 ? (
                    <div className="space-y-1">
                      {placeholderTracks.map(track => (
                        <TrackListItem
                          key={track.id}
                          {...track}
                          onPlay={() => handlePlayTrack(track.id)}
                        />
                      ))}
                    </div>
                  ) : searchQuery !== '' && <p className="text-muted-foreground">No tracks found for "{searchQuery}".</p>}
                </TabsContent>

                <TabsContent value="artists">
                  {renderSectionHeader('Artists', User)}
                  {searchQuery === '' && <p className="text-center text-muted-foreground mt-10">Enter a search term to find artists.</p>}
                  {searchQuery !== '' && placeholderArtists.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {placeholderArtists.map(item => <MediaItemCard key={item.id} {...item} itemId={item.id} />)}
                    </div>
                  ) : searchQuery !== '' && <p className="text-muted-foreground">No artists found for "{searchQuery}".</p>}
                </TabsContent>

                <TabsContent value="albums">
                  {renderSectionHeader('Albums', Disc3)}
                  {searchQuery === '' && <p className="text-center text-muted-foreground mt-10">Enter a search term to find albums.</p>}
                  {searchQuery !== '' && placeholderAlbums.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {placeholderAlbums.map(item => <MediaItemCard key={item.id} {...item} itemId={item.id} />)}
                    </div>
                  ) : searchQuery !== '' && <p className="text-muted-foreground">No albums found for "{searchQuery}".</p>}
                </TabsContent>

                <TabsContent value="playlists">
                  {renderSectionHeader('Playlists', ListMusic)}
                  {searchQuery === '' && <p className="text-center text-muted-foreground mt-10">Enter a search term to find playlists.</p>}
                  {searchQuery !== '' && placeholderPlaylists.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {placeholderPlaylists.map(item => <MediaItemCard key={item.id} {...item} itemId={item.id} />)}
                    </div>
                  ) : searchQuery !== '' && <p className="text-muted-foreground">No playlists found for "{searchQuery}".</p>}
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </main>
      </div>
      <PlayerFooter />
    </div>
  );
};

export default SearchPage;