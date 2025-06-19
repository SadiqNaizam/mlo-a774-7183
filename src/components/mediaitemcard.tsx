import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from 'framer-motion';

interface MediaItemCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  itemType: 'artist' | 'playlist' | 'album';
  itemId: string;
}

const MediaItemCard: React.FC<MediaItemCardProps> = ({
  imageUrl,
  title,
  subtitle,
  itemType,
  itemId,
}) => {
  console.log(`MediaItemCard loaded for: ${title} (Type: ${itemType}, ID: ${itemId})`);

  let linkTo = '#';
  const encodedItemId = encodeURIComponent(itemId);
  const encodedTitle = encodeURIComponent(title);

  if (itemType === 'artist') {
    linkTo = `/artist-detail?artistId=${encodedItemId}`;
  } else if (itemType === 'playlist') {
    linkTo = `/playlist-detail?playlistId=${encodedItemId}`;
  } else if (itemType === 'album') {
    linkTo = `/search?type=album&query=${encodedTitle}`;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 15, duration: 0.2 }}
      className="h-full"
    >
      {/* Card uses bg-card (now semi-transparent) and gets backdrop-blur-md */}
      <Card className="w-full h-full overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl group bg-card text-card-foreground backdrop-blur-md">
        <Link to={linkTo} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg flex flex-col">
          <AspectRatio
            ratio={1 / 1}
            className="bg-muted/30 rounded-t-lg overflow-hidden" /* Slightly transparent muted for placeholder aspect ratio */
          >
            <img
              src={imageUrl || 'https://via.placeholder.com/300'}
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