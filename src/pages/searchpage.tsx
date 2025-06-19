import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import GlobalHeader from '@/components/layout/GlobalHeader';
import NavigationSidebar from '@/components/layout/NavigationSidebar';
import PlayerFooter from '@/components/layout/PlayerFooter';

// Custom UI Components
import TrackListItem from '@/components/TrackListItem';
import MediaItemCard from '@/components/MediaItemCard';

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/components/ui/use-toast"; // For placeholder actions

// Lucide Icons
import { Search as SearchIcon, Music, ListMusic, User, Disc3 } from 'lucide-react';

// Placeholder data types
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

// Placeholder data
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
    // You could trigger a search here when searchQuery changes after a debounce
    if (searchQuery) {
      console.log(`Searching for: ${searchQuery}`);
      // Dummy search results for now
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
      <h2 className="text-2xl font-semibold tracking-tight text-white flex items-center">
        {icon && React.createElement(icon, { className: "mr-2 h-6 w-6 text-blue-400" })}
        {title}
      </h2>
      {/* <Button variant="link" className="text-sm text-blue-400 hover:text-blue-300">See All</Button> */}
    </div>
  );

  return (
    <div className="relative flex flex-col h-screen bg-neutral-900">
      <GlobalHeader />
      <div className="flex flex-1 overflow-hidden pt-16"> {/* pt-16 for GlobalHeader */}
        <NavigationSidebar />
        <main className="flex-1 overflow-y-auto sm:ml-60 pb-[88px] bg-gradient-to-b from-neutral-800 to-neutral-900"> {/* Sidebar width, Player height */}
          <ScrollArea className="h-full">
            <div className="px-4 py-6 md:px-6 lg:px-8 text-white">
              {/* Search Input Area */}
              <section className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Search</h1>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="What do you want to listen to?"
                    className="pl-10 pr-4 py-3 text-base h-12 rounded-full bg-neutral-700 border-neutral-600 focus:bg-neutral-600 focus:ring-blue-500 text-white placeholder-neutral-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </section>

              {/* Results Area with Tabs */}
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6 bg-neutral-800 p-1 rounded-md">
                  <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white hover:bg-neutral-700/50">All</TabsTrigger>
                  <TabsTrigger value="tracks" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white hover:bg-neutral-700/50">Tracks</TabsTrigger>
                  <TabsTrigger value="artists" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white hover:bg-neutral-700/50">Artists</TabsTrigger>
                  <TabsTrigger value="albums" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white hover:bg-neutral-700/50">Albums</TabsTrigger>
                  <TabsTrigger value="playlists" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white hover:bg-neutral-700/50">Playlists</TabsTrigger>
                </TabsList>

                {/* "All" Tab Content - Could show top results from each category */}
                <TabsContent value="all">
                  {/* For now, let's show a bit of everything if there's a query, or prompt to search */}
                  {searchQuery === '' && <p className="text-center text-neutral-400 mt-10">Search for your favorite music!</p>}
                  
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
                  {searchQuery === '' && <p className="text-center text-neutral-400 mt-10">Enter a search term to find tracks.</p>}
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
                  ) : searchQuery !== '' && <p className="text-neutral-400">No tracks found for "{searchQuery}".</p>}
                </TabsContent>

                <TabsContent value="artists">
                  {renderSectionHeader('Artists', User)}
                  {searchQuery === '' && <p className="text-center text-neutral-400 mt-10">Enter a search term to find artists.</p>}
                  {searchQuery !== '' && placeholderArtists.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {placeholderArtists.map(item => <MediaItemCard key={item.id} {...item} itemId={item.id} />)}
                    </div>
                  ) : searchQuery !== '' && <p className="text-neutral-400">No artists found for "{searchQuery}".</p>}
                </TabsContent>

                <TabsContent value="albums">
                  {renderSectionHeader('Albums', Disc3)}
                  {searchQuery === '' && <p className="text-center text-neutral-400 mt-10">Enter a search term to find albums.</p>}
                  {searchQuery !== '' && placeholderAlbums.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {placeholderAlbums.map(item => <MediaItemCard key={item.id} {...item} itemId={item.id} />)}
                    </div>
                  ) : searchQuery !== '' && <p className="text-neutral-400">No albums found for "{searchQuery}".</p>}
                </TabsContent>

                <TabsContent value="playlists">
                  {renderSectionHeader('Playlists', ListMusic)}
                  {searchQuery === '' && <p className="text-center text-neutral-400 mt-10">Enter a search term to find playlists.</p>}
                  {searchQuery !== '' && placeholderPlaylists.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {placeholderPlaylists.map(item => <MediaItemCard key={item.id} {...item} itemId={item.id} />)}
                    </div>
                  ) : searchQuery !== '' && <p className="text-neutral-400">No playlists found for "{searchQuery}".</p>}
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