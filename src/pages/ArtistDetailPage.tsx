import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // useLocation can be used to get artistId from query params

// Custom Components
import GlobalHeader from '@/components/layout/GlobalHeader';
import NavigationSidebar from '@/components/layout/NavigationSidebar';
import PlayerFooter from '@/components/layout/PlayerFooter';
import TrackListItem from '@/components/TrackListItem';
import MediaItemCard from '@/components/MediaItemCard';

// Shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // As per layout_info for bio

// Lucide Icons
import { Play, UserPlus, Music } from 'lucide-react';

// Placeholder Data (Doraemon-inspired theme for a fictional artist)
const artistData = {
  id: 'the-time-travelers',
  name: "The Time Travelers",
  profileImageUrl: "https://via.placeholder.com/200/007BFF/FFFFFF?Text=TT", // Blue like Doraemon
  monthlyListeners: "2,345,678",
  bio: "Hailing from the 22nd century, The Time Travelers blend futuristic synths with nostalgic melodies, inspired by cartoon theme songs and the jingles of fantastic gadgets. Their music often explores themes of friendship, adventure, and the wonders of technology, much like the adventures of a certain blue robotic cat. They are known for their energetic live shows and bell-like signature sounds. Their hit 'Gadget Groove' topped the temporal charts for 12 straight weeks!",
};

const popularTracksData = [
  { id: 'track-1', coverArtUrl: 'https://via.placeholder.com/40/FFD700/000000?Text=S1', title: 'Gadget Groove', artist: artistData.name, album: 'Future Echoes', duration: '3:15', isCurrent: false, isPlaying: false },
  { id: 'track-2', coverArtUrl: 'https://via.placeholder.com/40/FFC0CB/000000?Text=S2', title: 'Pocketful of Dreams', artist: artistData.name, album: 'Future Echoes', duration: '4:02', isCurrent: false, isPlaying: false },
  { id: 'track-3', coverArtUrl: 'https://via.placeholder.com/40/90EE90/000000?Text=S3', title: 'Anywhere Door Anthem', artist: artistData.name, album: 'Timeline Tunes', duration: '2:58', isCurrent: false, isPlaying: false },
  { id: 'track-4', coverArtUrl: 'https://via.placeholder.com/40/ADD8E6/000000?Text=S4', title: 'Memory Bread Serenade', artist: artistData.name, album: 'Timeline Tunes', duration: '3:30', isCurrent: false, isPlaying: false },
  { id: 'track-5', coverArtUrl: 'https://via.placeholder.com/40/FFA07A/000000?Text=S5', title: 'Bell\'s Chime Rhapsody', artist: artistData.name, album: 'Echoes From Tomorrow', duration: '1:45', isCurrent: false, isPlaying: false },
];

const discographyData = [
  { id: 'album-1', imageUrl: 'https://via.placeholder.com/150/1E90FF/FFFFFF?Text=FE', title: 'Future Echoes', subtitle: `Album • ${new Date().getFullYear() - 2}`, itemType: 'album' as 'album' | 'playlist' | 'artist' },
  { id: 'album-2', imageUrl: 'https://via.placeholder.com/150/32CD32/FFFFFF?Text=TT', title: 'Timeline Tunes', subtitle: `Album • ${new Date().getFullYear() - 1}`, itemType: 'album' as 'album' | 'playlist' | 'artist' },
  { id: 'album-3', imageUrl: 'https://via.placeholder.com/150/FF69B4/FFFFFF?Text=ET', title: 'Echoes From Tomorrow', subtitle: `Album • ${new Date().getFullYear()}`, itemType: 'album' as 'album' | 'playlist' | 'artist' },
  { id: 'single-1', imageUrl: 'https://via.placeholder.com/150/FFA500/000000?Text=SS', title: 'Single Soundwave', subtitle: `Single • ${new Date().getFullYear()}`, itemType: 'album' as 'album' | 'playlist' | 'artist' }, // Singles often link like albums
  { id: 'ep-1', imageUrl: 'https://via.placeholder.com/150/8A2BE2/FFFFFF?Text=EP', title: 'EPsodic Adventures', subtitle: `EP • ${new Date().getFullYear() -1}`, itemType: 'album' as 'album' | 'playlist' | 'artist'},
  { id: 'album-4', imageUrl: 'https://via.placeholder.com/150/DC143C/FFFFFF?Text=RG', title: 'Robotic Grooves', subtitle: `Album • ${new Date().getFullYear() - 3}`, itemType: 'album' as 'album' | 'playlist' | 'artist' },
];

const ArtistDetailPage: React.FC = () => {
  const location = useLocation(); // To potentially get artistId from query params

  useEffect(() => {
    console.log('ArtistDetailPage loaded');
    const queryParams = new URLSearchParams(location.search);
    const artistId = queryParams.get('artistId');
    if (artistId) {
      console.log('Fetching data for artist ID:', artistId);
      // In a real app, you would fetch artist data based on this ID.
      // For this example, we use static data.
    }
  }, [location]);

  const handlePlayArtist = () => {
    console.log(`Play all music for ${artistData.name}`);
    // Logic to start playing artist's top tracks or a curated station
  };

  const handleFollowArtist = () => {
    console.log(`Follow artist: ${artistData.name}`);
    // Logic to follow/unfollow artist
  };

  const handlePlayTrack = (trackId: string) => {
    console.log('Play track:', trackId);
    // Add to queue & play, update global player state
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <GlobalHeader />
      <NavigationSidebar />
      
      <main className="ml-0 sm:ml-60 mt-16 mb-[84px]"> {/* Adjust for fixed header, sidebar, and footer */}
        <ScrollArea className="h-[calc(100vh-64px-84px)]"> {/* Full height minus header and footer */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Artist Header Section */}
            <section className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-10">
              <Avatar className="w-36 h-36 md:w-48 md:h-48 border-4 border-muted shadow-lg rounded-full">
                <AvatarImage src={artistData.profileImageUrl} alt={artistData.name} />
                <AvatarFallback className="text-4xl bg-blue-500 text-white">
                  {artistData.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <p className="text-sm uppercase text-muted-foreground font-semibold tracking-wider">Artist</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-blue-600 dark:text-blue-400">{artistData.name}</h1>
                <p className="text-muted-foreground mt-2 text-sm">Monthly Listeners: {artistData.monthlyListeners}</p>
                <div className="mt-6 flex gap-3 justify-center md:justify-start">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 flex items-center gap-2 rounded-full" onClick={handlePlayArtist}>
                    <Play className="h-5 w-5 fill-white" /> Play
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-3 flex items-center gap-2 rounded-full border-blue-600 text-blue-600 hover:bg-blue-600/10" onClick={handleFollowArtist}>
                    <UserPlus className="h-5 w-5" /> Follow
                  </Button>
                </div>
              </div>
            </section>

            {/* Artist Bio Section */}
            {artistData.bio && (
              <section className="mb-12 p-6 bg-muted/40 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-3 flex items-center">
                  <Music className="h-6 w-6 mr-2 text-blue-500" /> Biography
                </h2>
                <Textarea 
                  readOnly 
                  value={artistData.bio}
                  className="w-full min-h-[120px] p-0 bg-transparent border-0 text-muted-foreground leading-relaxed focus-visible:ring-0 resize-none"
                  rows={5}
                />
              </section>
            )}

            {/* Popular Tracks Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-semibold mb-6">Popular Tracks</h2>
              <div className="space-y-2">
                {popularTracksData.map((track, index) => (
                  <TrackListItem
                    key={track.id}
                    id={track.id}
                    coverArtUrl={track.coverArtUrl}
                    title={track.title}
                    artist={track.artist}
                    album={track.album}
                    duration={track.duration}
                    onPlay={handlePlayTrack}
                    isCurrentTrack={track.isCurrent}
                    isPlaying={track.isPlaying}
                  />
                ))}
              </div>
            </section>

            {/* Discography Section (Albums/Singles) */}
            <section>
              <h2 className="text-3xl font-semibold mb-6">Discography</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {discographyData.map((item) => (
                  <MediaItemCard
                    key={item.id}
                    itemId={item.id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    subtitle={item.subtitle}
                    itemType={item.itemType}
                  />
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
      </main>
      
      <PlayerFooter />
    </div>
  );
};

export default ArtistDetailPage;