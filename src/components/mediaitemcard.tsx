import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from 'framer-motion'; // Added framer-motion

interface MediaItemCardProps {
  imageUrl: string;
  title: string;
  subtitle: string; // e.g., "Artist Name" for an album, "Playlist" for a playlist, "Artist" for an artist
  itemType: 'artist' | 'playlist' | 'album';
  itemId: string; // Unique identifier for the item (e.g., slug or ID)
}

const MediaItemCard: React.FC<MediaItemCardProps> = ({
  imageUrl,
  title,
  subtitle,
  itemType,
  itemId,
}) => {
  console.log(`MediaItemCard loaded for: ${title} (Type: ${itemType}, ID: ${itemId})`);

  let linkTo = '#'; // Default fallback link
  const encodedItemId = encodeURIComponent(itemId);
  const encodedTitle = encodeURIComponent(title);

  // Construct link based on itemType, consistent with App.tsx routes
  // Assumes detail pages can handle item identification via query parameters
  if (itemType === 'artist') {
    linkTo = `/artist-detail?artistId=${encodedItemId}`;
  } else if (itemType === 'playlist') {
    linkTo = `/playlist-detail?playlistId=${encodedItemId}`;
  } else if (itemType === 'album') {
    // No specific /album-detail route in App.tsx.
    // Fallback: link to search results for the album title.
    linkTo = `/search?type=album&query=${encodedTitle}`;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 15, duration: 0.2 }}
      className="h-full" // Ensure motion.div takes full height for proper layout
    >
      <Card className="w-full h-full overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl group bg-card text-card-foreground">
        <Link to={linkTo} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg flex flex-col">
          <AspectRatio
            ratio={1 / 1}
            className="bg-muted rounded-t-lg overflow-hidden"
          >
            <img
              src={imageUrl || 'https://via.placeholder.com/300'} // Default placeholder
              alt={`Cover art for ${title}`}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </AspectRatio>
          <CardContent className="p-3 sm:p-4 space-y-1 flex-grow flex flex-col justify-center">
            <h3
              className="text-base sm:text-lg font-semibold truncate group-hover:text-primary transition-colors"
              title={title}
            >
              {title}
            </h3>
            <p
              className="text-xs sm:text-sm text-muted-foreground truncate"
              title={subtitle}
            >
              {subtitle}
            </p>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default MediaItemCard;