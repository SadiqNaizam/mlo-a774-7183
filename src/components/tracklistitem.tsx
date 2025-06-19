import React from 'react';
import { Play, MoreHorizontal, PlusCircle, ListPlus, Heart, Pause } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // DropdownMenuContent will use bg-popover
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

interface TrackListItemProps {
  id: string;
  coverArtUrl: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  onPlay: (id: string) => void;
  isCurrentTrack?: boolean;
  isPlaying?: boolean;
}

const TrackListItem: React.FC<TrackListItemProps> = ({
  id,
  coverArtUrl,
  title,
  artist,
  album,
  duration,
  onPlay,
  isCurrentTrack = false,
  isPlaying = false,
}) => {
  const { toast } = useToast();
  console.log('TrackListItem loaded for:', title);

  const handleAction = (actionName: string) => {
    toast({
      title: "Action Triggered",
      description: `${actionName} for \\"${title}\\".`,
    });
    console.log(`${actionName} for track ID: ${id}`);
  };

  return (
    <motion.div
      className={cn(
        "flex items-center p-2 rounded-md group cursor-default transition-colors",
        // Using bg-card with varying opacity for hover/active. Added backdrop-blur and border.
        "bg-card/30 hover:bg-card/50 backdrop-blur-sm border border-transparent hover:border-[hsla(var(--border)/0.05)]",
        isCurrentTrack && "bg-card/60 border-[hsla(var(--border)/0.1)]" // More prominent border if current
      )}
      aria-current={isCurrentTrack ? "page" : undefined}
      whileHover={{ scale: 1.01, x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="relative w-10 h-10 mr-3 flex-shrink-0">
        <img
          src={coverArtUrl || 'https://via.placeholder.com/40'}
          alt={`${title} cover art`}
          className="w-full h-full rounded object-cover"
        />
        <button
          onClick={() => onPlay(id)}
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black rounded transition-opacity",
            "bg-opacity-0 group-hover:bg-opacity-50 opacity-0 group-hover:opacity-100",
            isCurrentTrack && "bg-opacity-50 opacity-100"
          )}
          aria-label={isCurrentTrack && isPlaying ? `Pause ${title}` : `Play ${title}`}
        >
          {isCurrentTrack && isPlaying ? (
            <Pause className="h-5 w-5 text-white" />
          ) : (
            <Play className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      <div className="flex-grow min-w-0 mr-3">
        <p
          className={cn(
            "font-medium truncate text-sm",
            isCurrentTrack ? "text-primary dark:text-primary" : "text-foreground" // Ensure text-primary is visible
          )}
        >
          {title}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {artist}
          {album && <span className="mx-1">•</span>}
          {album && <span>{album}</span>}
        </p>
      </div>

      <div className="flex items-center ml-auto pl-2 space-x-2 flex-shrink-0">
        <span className="text-xs text-muted-foreground w-10 text-right">{duration}</span>
        {/* DropdownMenuContent uses bg-popover, which is glassmorphic via tailwind.config and parent blur */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 focus:opacity-100 data-[state=open]:opacity-100"
              aria-label={`Options for ${title}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 backdrop-blur-md border-[hsla(var(--border)/0.15)]">
             {/* Added backdrop-blur to DropdownMenuContent itself */}
            <DropdownMenuItem onClick={() => handleAction('Add to Queue')}>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Add to Queue</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction('Add to Playlist')}>
              <ListPlus className="mr-2 h-4 w-4" />
              <span>Add to Playlist...</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleAction('Like Song')}>
              <Heart className="mr-2 h-4 w-4" />
              <span>Like Song</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
};

export default TrackListItem;