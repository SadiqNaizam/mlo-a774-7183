import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
  Music2,
} from 'lucide-react';

// Helper function for formatting time (MM:SS)
const formatTime = (timeInSeconds: number): string => {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

interface Track {
  id: string;
  title: string;
  artist: string;
  coverArtUrl: string;
  audioSrc: string;
}

const playlist: Track[] = [
  {
    id: 'sh-song-1',
    title: 'SoundHelix Song 1',
    artist: 'SoundHelix',
    coverArtUrl: 'https://picsum.photos/seed/sh1/64/64',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 'sh-song-2',
    title: 'SoundHelix Song 2',
    artist: 'SoundHelix',
    coverArtUrl: 'https://picsum.photos/seed/sh2/64/64',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 'sh-song-3',
    title: 'SoundHelix Song 3',
    artist: 'SoundHelix',
    coverArtUrl: 'https://picsum.photos/seed/sh3/64/64',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 'sh-song-4',
    title: 'SoundHelix Song 4',
    artist: 'SoundHelix',
    coverArtUrl: 'https://picsum.photos/seed/sh4/64/64',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
];

const PlaybackControls: React.FC = () => {
  console.log('PlaybackControls component loaded');

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(playlist.length > 0 ? playlist[0] : null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [lastVolume, setLastVolume] = useState(0.75);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [shuffledPlaylist, setShuffledPlaylist] = useState<Track[]>(playlist);

  useEffect(() => {
    if (isShuffle) {
      const originalPlaylist = [...playlist];
      const current = originalPlaylist.splice(currentTrackIndex, 1)[0];
      const shuffled = originalPlaylist.sort(() => Math.random() - 0.5);
      if (current) {
        shuffled.unshift(current);
      }
      setShuffledPlaylist(shuffled);
      setCurrentTrackIndex(0);
      setCurrentTrack(shuffled[0] || null);
    } else {
      setShuffledPlaylist([...playlist]);
      if (currentTrack) {
        const originalIndex = playlist.findIndex(track => track.id === currentTrack.id);
        setCurrentTrackIndex(originalIndex !== -1 ? originalIndex : 0);
      } else if (playlist.length > 0) {
        setCurrentTrackIndex(0);
        setCurrentTrack(playlist[0]);
      }
    }
  }, [isShuffle, currentTrackIndex, currentTrack]); // Added currentTrackIndex and currentTrack


  useEffect(() => {
    const audio = audioRef.current;
    const trackToPlay = isShuffle ? shuffledPlaylist[currentTrackIndex] : playlist[currentTrackIndex];
    setCurrentTrack(trackToPlay || null);

    if (audio && trackToPlay) {
      if (audio.src !== trackToPlay.audioSrc) {
        audio.src = trackToPlay.audioSrc;
        setCurrentTime(0);
        setDuration(0);
      }
      if (isPlaying) {
        audio.load();
        audio.play().catch(error => console.error("Error playing new track:", error));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex, isShuffle, shuffledPlaylist]); // playlist dependency removed, added shuffledPlaylist

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && currentTrack) {
      audio.play().catch(error => console.error("Error playing audio:", error));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  const handleNextTrack = useCallback((autoNext = false) => {
    const currentPlaylist = isShuffle ? shuffledPlaylist : playlist;
    if (currentPlaylist.length === 0) return;

    let nextIndex = currentTrackIndex + 1;
    
    if (repeatMode === 'off' && nextIndex >= currentPlaylist.length && autoNext) {
      setIsPlaying(false);
      setCurrentTime(0);
      return;
    }
    
    if (nextIndex >= currentPlaylist.length) {
      nextIndex = 0; 
    }
    setCurrentTrackIndex(nextIndex);
    if (autoNext && isPlaying === false && nextIndex === 0 && repeatMode !== 'all') {
        // Do nothing
    } else {
        setIsPlaying(true); 
    }
  }, [currentTrackIndex, isShuffle, shuffledPlaylist, playlist, repeatMode, isPlaying]);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (audio.duration !== Infinity && !isNaN(audio.duration)) {
         setDuration(audio.duration);
      }
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(e => console.error("Error replaying track:", e));
        setIsPlaying(true);
      } else { 
        handleNextTrack(true);
      }
    };
    
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.volume = isMuted ? 0 : volume;
    audio.muted = isMuted;

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume, isMuted, repeatMode, currentTrack, isPlaying, handleNextTrack]);

  const handlePlayPause = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current && currentTrack) {
      const newTime = value[0];
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setLastVolume(newVolume > 0 ? newVolume : lastVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      audioRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      const newVolume = lastVolume > 0 ? lastVolume : 0.1;
      setIsMuted(false);
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = newVolume;
      }
    } else { 
      if (volume > 0) setLastVolume(volume);
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.muted = true;
      }
    }
  };
  
  const handlePreviousTrack = () => {
    const currentPlaylist = isShuffle ? shuffledPlaylist : playlist;
    if (currentPlaylist.length === 0) return;

    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) {
      prevIndex = currentPlaylist.length - 1;
    }
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleShuffleToggle = () => setIsShuffle(!isShuffle);

  const handleRepeatToggle = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };
  
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="h-5 w-5" />;
    if (volume < 0.5) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  if (!currentTrack) {
    return (
      // Changed bg-neutral-800 to bg-transparent as PlayerFooter provides the glass surface
      <div className="bg-transparent text-muted-foreground p-3 h-[88px] flex items-center justify-center w-full">
        No tracks available.
        <audio ref={audioRef} />
      </div>
    );
  }

  return (
    // Changed bg-neutral-900 to bg-transparent. PlayerFooter provides the glass surface.
    <div className="bg-transparent text-foreground p-3 h-[88px] flex items-center justify-between w-full">
      <audio ref={audioRef} preload="metadata" />
      {/* Left Section: Track Info */}
      <div className="flex items-center gap-3 w-1/4 min-w-[200px] md:w-[300px]">
        <Avatar className="h-12 w-12 rounded">
          <AvatarImage src={currentTrack.coverArtUrl} alt={currentTrack.title} />
          {/* Fallback uses bg-muted (now semi-transparent) */}
          <AvatarFallback className="bg-muted rounded">
            <Music2 className="h-6 w-6 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="overflow-hidden">
          <p className="text-sm font-medium truncate text-foreground">{currentTrack.title}</p>
          <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Center Section: Playback Controls */}
      <div className="flex-grow flex flex-col items-center gap-2 max-w-xl">
        <div className="flex items-center gap-2 md:gap-3">
          <Button variant="ghost" size="icon" onClick={handleShuffleToggle} className={isShuffle ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}>
            <Shuffle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handlePreviousTrack} className="text-foreground/80 hover:text-foreground" disabled={playlist.length <= 1}>
            <SkipBack className="h-5 w-5" />
          </Button>
          {/* Play button style adjusted for better visibility on glass */}
          <Button variant="default" size="icon" onClick={handlePlayPause} className="bg-primary/90 text-primary-foreground hover:bg-primary rounded-full h-9 w-9 p-2">
            {isPlaying ? <Pause className="h-5 w-5 fill-primary-foreground" /> : <Play className="h-5 w-5 fill-primary-foreground" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleNextTrack(false)} className="text-foreground/80 hover:text-foreground" disabled={playlist.length <= 1}>
            <SkipForward className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleRepeatToggle} className={repeatMode !== 'off' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}>
            {repeatMode === 'one' ? <Repeat1 className="h-5 w-5" /> : <Repeat className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full px-2">
          <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration > 0 ? duration : 1} 
            step={1}
            onValueChange={handleSeek}
            // Slider track style slightly adjusted for glass theme
            className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-muted/70 [&>span:first-child>span]:h-1 [&>span:first-child>span]:bg-primary" 
            disabled={!currentTrack || duration === 0}
          />
          <span className="text-xs text-muted-foreground w-10 text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Section: Volume Control */}
      <div className="flex items-center gap-2 w-1/4 min-w-[150px] md:w-[200px] justify-end">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-foreground/80 hover:text-foreground">
          {getVolumeIcon()}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          // Slider track style slightly adjusted for glass theme
          className="w-24 md:w-32 [&>span:first-child]:h-1 [&>span:first-child]:bg-muted/70 [&>span:first-child>span]:h-1 [&>span:first-child>span]:bg-primary"
        />
      </div>
    </div>
  );
};

export default PlaybackControls;