import React from 'react';
import GlobalHeader from '@/components/layout/GlobalHeader';
import NavigationSidebar from '@/components/layout/NavigationSidebar';
import PlayerFooter from '@/components/layout/PlayerFooter';
import MediaItemCard from '@/components/MediaItemCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// Button component is available if needed for "View All" etc., but not used in this version to keep navigation simple.
// import { Button } from "@/components/ui/button";
// Link is used internally by MediaItemCard and NavigationSidebar.
// import { Link } from 'react-router-dom';

interface MediaItemData {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  itemType: 'artist' | 'playlist' | 'album';
}

const featuredPlaylistsData: MediaItemData[] = [
  { id: 'dora-pocket-picks', imageUrl: 'https://placehold.co/300x300/2563EB/FFFFFF/png?text=Pocket+Picks&font=sans-serif', title: "Doraemon's Pocket Picks", subtitle: 'Curated by Doraemon', itemType: 'playlist' },
  { id: 'nobita-naptime', imageUrl: 'https://placehold.co/300x300/FFD700/000000/png?text=Naptime+Tunes&font=sans-serif', title: "Nobita's Naptime Tunes", subtitle: 'Relax and unwind', itemType: 'playlist' },
  { id: 'shizuka-study', imageUrl: 'https://placehold.co/300x300/FF6B6B/FFFFFF/png?text=Study+Sonatas&font=sans-serif', title: "Shizuka's Study Sonatas", subtitle: 'Focus and concentrate', itemType: 'playlist' },
  { id: 'gian-power', imageUrl: 'https://placehold.co/300x300/4CAF50/FFFFFF/png?text=Power+Anthems&font=sans-serif', title: "Gian's Power Anthems", subtitle: 'Motivational hits', itemType: 'playlist' },
  { id: 'suneo-smooth', imageUrl: 'https://placehold.co/300x300/9C27B0/FFFFFF/png?text=Smooth+Selections&font=sans-serif', title: "Suneo's Smooth Selections", subtitle: 'Chic & trendy', itemType: 'playlist' },
];

const newReleasesData: MediaItemData[] = [
  { id: 'the-dorayakis-album', imageUrl: 'https://placehold.co/300x300/00BCD4/FFFFFF/png?text=Future+Sounds&font=sans-serif', title: 'Future Sounds', subtitle: 'The Dorayakis', itemType: 'album' },
  { id: 'gadget-grooves-album', imageUrl: 'https://placehold.co/300x300/FF9800/FFFFFF/png?text=Time+Warp&font=sans-serif', title: 'Time Warp Beats', subtitle: 'Gadget Grooves', itemType: 'album' },
  { id: 'bell-ringers-single', imageUrl: 'https://placehold.co/300x300/8BC34A/000000/png?text=Anywhere+Pop&font=sans-serif', title: 'Anywhere Door Pop', subtitle: 'Bell Ringers', itemType: 'album' }, // Assuming single is treated as an album type for card
  { id: 'future-gadget-band', imageUrl: 'https://placehold.co/300x300/E91E63/FFFFFF/png?text=Techno+Dreams&font=sans-serif', title: 'Techno Dreams', subtitle: 'Future Gadget Band', itemType: 'album' },
];

const recentlyPlayedData: MediaItemData[] = [
  { id: 'dora-pocket-picks', imageUrl: 'https://placehold.co/300x300/2563EB/FFFFFF/png?text=Pocket+Picks&font=sans-serif', title: "Doraemon's Pocket Picks", subtitle: 'Curated by Doraemon', itemType: 'playlist' },
  { id: 'time-travel-mix', imageUrl: 'https://placehold.co/300x300/795548/FFFFFF/png?text=Time+Travel+Mix&font=sans-serif', title: 'Time Travel Mix', subtitle: 'Various Artists', itemType: 'playlist' },
  { id: 'nobita-artist', imageUrl: 'https://placehold.co/300x300/607D8B/FFFFFF/png?text=Nobita&font=sans-serif', title: 'Noby Nobi', subtitle: 'Artist', itemType: 'artist' },
  { id: 'gadget-grooves-album', imageUrl: 'https://placehold.co/300x300/FF9800/FFFFFF/png?text=Time+Warp&font=sans-serif', title: 'Time Warp Beats', subtitle: 'Gadget Grooves', itemType: 'album' },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex flex-col h-screen bg-background">
      <GlobalHeader />
      <div className="flex flex-1 overflow-hidden"> {/* Container for sidebar and main content */}
        <NavigationSidebar />
        <ScrollArea className="flex-1">
          <main className="px-4 md:px-6 py-6 sm:ml-60 mt-16 mb-[88px] bg-gradient-to-b from-blue-100 via-white to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-black">
            {/* Section 1: Featured Playlists */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-5 text-neutral-800 dark:text-neutral-100">Featured Playlists</h2>
              <Carousel
                opts={{ align: "start" }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {featuredPlaylistsData.map((item) => (
                    <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                      <MediaItemCard
                        itemId={item.id}
                        imageUrl={item.imageUrl}
                        title={item.title}
                        subtitle={item.subtitle}
                        itemType={item.itemType}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </section>

            {/* Section 2: New Releases */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-5 text-neutral-800 dark:text-neutral-100">New Releases</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {newReleasesData.map((item) => (
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

            {/* Section 3: Recently Played */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-5 text-neutral-800 dark:text-neutral-100">Recently Played</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {recentlyPlayedData.map((item) => (
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
          </main>
        </ScrollArea>
      </div>
      <PlayerFooter />
    </div>
  );
};

export default HomePage;