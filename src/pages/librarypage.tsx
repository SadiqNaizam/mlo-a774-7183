import React from 'react';
import GlobalHeader from '@/components/layout/GlobalHeader';
import NavigationSidebar from '@/components/layout/NavigationSidebar';
import PlayerFooter from '@/components/layout/PlayerFooter';
import MediaItemCard from '@/components/MediaItemCard';
import TrackListItem from '@/components/TrackListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const samplePlaylists = [
  { id: 'pl1', title: "Doraemon's Happy Tunes", subtitle: 'Playlist', imageUrl: 'https://picsum.photos/seed/doraPlaylist1/300/300', itemType: 'playlist' as 'playlist' | 'artist' | 'album' },
  { id: 'pl2', title: "Nobita's Study Beats", subtitle: 'Playlist', imageUrl: 'https://picsum.photos/seed/doraPlaylist2/300/300', itemType: 'playlist' as 'playlist' | 'artist' | 'album' },
  { id: 'pl3', title: "Shizuka's Calm Classics", subtitle: 'Playlist', imageUrl: 'https://picsum.photos/seed/doraPlaylist3/300/300', itemType: 'playlist' as 'playlist' | 'artist' | 'album' },
  { id: 'pl4', title: "Gian's Concert Rehearsal", subtitle: 'Playlist', imageUrl: 'https://picsum.photos/seed/doraPlaylist4/300/300', itemType: 'playlist' as 'playlist' | 'artist' | 'album' },
];

const sampleLikedSongs = [
  { id: 'song1', title: 'Yume wo Kanaete Doraemon', artist: 'MAO', album: 'Doraemon Opening Themes', duration: '3:45', coverArtUrl: 'https://picsum.photos/seed/doraSong1/40/40' },
  { id: 'song2', title: 'Himawari no Yakusoku', artist: 'Motohiro Hata', album: 'Stand By Me Doraemon OST', duration: '5:15', coverArtUrl: 'https://picsum.photos/seed/doraSong2/40/40' },
  { id: 'song3', title: "Boku Doraemon", artist: 'Nobuyo Ōyama', album: 'Classic Doraemon Hits', duration: '2:30', coverArtUrl: 'https://picsum.photos/seed/doraSong3/40/40' },
  { id: 'song4', title: "Dorami's Theme Song", artist: 'Keiko Yokozawa', album: 'The Doraemons OST', duration: '3:10', coverArtUrl: 'https://picsum.photos/seed/doraSong4/40/40' },
];

const sampleArtists = [
  { id: 'art1', title: 'MAO', subtitle: 'Artist', imageUrl: 'https://picsum.photos/seed/doraArtist1/300/300', itemType: 'artist' as 'playlist' | 'artist' | 'album' },
  { id: 'art2', title: 'Motohiro Hata', subtitle: 'Artist', imageUrl: 'https://picsum.photos/seed/doraArtist2/300/300', itemType: 'artist' as 'playlist' | 'artist' | 'album' },
  { id: 'art3', title: 'Nobuyo Ōyama', subtitle: 'Artist', imageUrl: 'https://picsum.photos/seed/doraArtist3/300/300', itemType: 'artist' as 'playlist' | 'artist' | 'album' },
];

const sampleAlbums = [
  { id: 'alb1', title: 'Doraemon Movie Soundtracks', subtitle: 'Album by Shunsuke Kikuchi', imageUrl: 'https://picsum.photos/seed/doraAlbum1/300/300', itemType: 'album' as 'playlist' | 'artist' | 'album' },
  { id: 'alb2', title: 'The Best of Doraemon Songs', subtitle: 'Album by Various Artists', imageUrl: 'https://picsum.photos/seed/doraAlbum2/300/300', itemType: 'album' as 'playlist' | 'artist' | 'album' },
  { id: 'alb3', title: 'Doraemon 25th Anniversary', subtitle: 'Album by Colombia Records', imageUrl: 'https://picsum.photos/seed/doraAlbum3/300/300', itemType: 'album' as 'playlist' | 'artist' | 'album' },
];

const LibraryPage: React.FC = () => {
  console.log('LibraryPage loaded');

  const handlePlaySong = (songId: string) => {
    console.log(`Attempting to play song from Library: ${songId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent"> {/* bg-transparent to show body's bg-background */}
      <GlobalHeader />
      <div className="flex flex-1 h-full">
        <NavigationSidebar />
        {/* Main content uses bg-background (semi-transparent) and adds backdrop-blur */}
        <main className="flex-1 pt-16 pl-0 sm:pl-60 pb-[88px] bg-background backdrop-blur-md supports-[backdrop-filter]:bg-transparent">
          <ScrollArea className="h-full w-full">
            <div className="container mx-auto px-4 py-6 lg:px-8">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                Your Library
              </h2>
              <Tabs defaultValue="playlists" className="space-y-6">
                {/* TabsList uses bg-muted (semi-transparent) and backdrop-blur */}
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 p-1 h-auto bg-muted rounded-lg backdrop-blur-sm">
                  <TabsTrigger value="playlists" className="py-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-card/70 backdrop-blur-sm">Playlists</TabsTrigger>
                  <TabsTrigger value="liked-songs" className="py-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-card/70 backdrop-blur-sm">Liked Songs</TabsTrigger>
                  <TabsTrigger value="artists" className="py-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-card/70 backdrop-blur-sm">Artists</TabsTrigger>
                  <TabsTrigger value="albums" className="py-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-card/70 backdrop-blur-sm">Albums</TabsTrigger>
                </TabsList>

                <TabsContent value="playlists">
                  {samplePlaylists.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
                      {samplePlaylists.map((playlist) => (
                        <MediaItemCard
                          key={playlist.id}
                          itemId={playlist.id}
                          title={playlist.title}
                          subtitle={playlist.subtitle}
                          imageUrl={playlist.imageUrl}
                          itemType={playlist.itemType}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">You haven't created or saved any playlists yet.</p>
                  )}
                </TabsContent>

                <TabsContent value="liked-songs">
                  {sampleLikedSongs.length > 0 ? (
                    <div className="space-y-2">
                      {sampleLikedSongs.map((song, index) => (
                        <TrackListItem
                          key={song.id}
                          id={song.id}
                          coverArtUrl={song.coverArtUrl}
                          title={song.title}
                          artist={song.artist}
                          album={song.album}
                          duration={song.duration}
                          onPlay={handlePlaySong}
                        />
                      ))}
                    </div>
                  ) : (
                     <p className="text-muted-foreground">You haven't liked any songs yet.</p>
                  )}
                </TabsContent>

                <TabsContent value="artists">
                   {sampleArtists.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
                      {sampleArtists.map((artist) => (
                        <MediaItemCard
                          key={artist.id}
                          itemId={artist.id}
                          title={artist.title}
                          subtitle={artist.subtitle}
                          imageUrl={artist.imageUrl}
                          itemType={artist.itemType}
                        />
                      ))}
                    </div>
                   ) : (
                    <p className="text-muted-foreground">You aren't following any artists yet.</p>
                   )}
                </TabsContent>

                <TabsContent value="albums">
                  {sampleAlbums.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
                      {sampleAlbums.map((album) => (
                        <MediaItemCard
                          key={album.id}
                          itemId={album.id}
                          title={album.title}
                          subtitle={album.subtitle}
                          imageUrl={album.imageUrl}
                          itemType={album.itemType}
                        />
                      ))}
                    </div>
                  ) : (
                     <p className="text-muted-foreground">You haven't saved any albums yet.</p>
                  )}
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

export default LibraryPage;