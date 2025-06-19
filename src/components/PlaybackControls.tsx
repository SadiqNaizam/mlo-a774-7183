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

// Sample initial track (In a real app, this would come from props or global state)
const initialTrack: Track = {
  id: 'dora-song-1',
  title: 'Yume wo Kanaete Doraemon',
  artist: 'MAO',
  coverArtUrl: 'https://via.placeholder.com/64/2563EB/FFFFFF?Text=D', // Doraemon-esque placeholder
  audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder audio URL
};

const PlaybackControls: React.FC = () => {
  console.log('PlaybackControls component loaded');

  const [currentTrack, setCurrentTrack] = useState<Track | null>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [lastVolume, setLastVolume] = useState(0.75); // To restore volume after unmuting

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentTrack) {
      audio.src = currentTrack.audioSrc; // Set src when track changes
      if (isPlaying) { // If it was playing, try to play new track
        audio.play().catch(error => console.error("Error playing new track:", error));
      }
    }
  }, [currentTrack?.audioSrc]); // Note: isPlaying removed from deps to avoid auto-play on track change unless already playing.

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(error => console.error("Error playing audio:", error));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setCurrentTime(0);
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(e => console.error("Error replaying track:", e));
        setIsPlaying(true);
      } else if (repeatMode === 'all') {
        // In a real app, this would go to the next track in the playlist
        // For this demo, we'll replay the current track if 'all' is on
        audio.currentTime = 0;
        audio.play().catch(e => console.error("Error replaying track:", e));
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.volume = volume;
    audio.muted = isMuted;

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume, isMuted, repeatMode, currentTrack?.audioSrc]); // Re-attach if these change

  const handlePlayPause = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = value[0];
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      audioRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    if (isMuted) { // Unmuting
      setIsMuted(false);
      setVolume(lastVolume > 0 ? lastVolume : 0.1); // Restore to lastVolume or a small default if lastVolume was 0
      if (audioRef.current) audioRef.current.muted = false;
    } else { // Muting
      setLastVolume(volume); // Save current volume
      setIsMuted(true);
      setVolume(0); // Visually set slider to 0
      if (audioRef.current) audioRef.current.muted = true;
    }
  };
  
  const handleNextTrack = () => {
    console.log("Next track button clicked (no playlist functionality implemented)");
    // Placeholder: Could load another sample track or cycle
  };

  const handlePreviousTrack = () => {
    console.log("Previous track button clicked (no playlist functionality implemented)");
    // Placeholder
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
      <div className="bg-neutral-800 text-neutral-400 p-3 h-[80px] flex items-center justify-center w-full">
        No track selected.
        <audio ref={audioRef} />
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 text-white p-3 h-[88px] flex items-center justify-between w-full border-t border-neutral-700">
      <audio ref={audioRef} />
      {/* Left Section: Track Info */}
      <div className="flex items-center gap-3 w-1/4 min-w-[200px] md:w-[300px]">
        <Avatar className="h-12 w-12 rounded">
          <AvatarImage src={currentTrack.coverArtUrl} alt={currentTrack.title} />
          <AvatarFallback className="bg-neutral-700 rounded">
            <Music2 className="h-6 w-6 text-neutral-400" />
          </AvatarFallback>
        </Avatar>
        <div className="overflow-hidden">
          <p className="text-sm font-medium truncate text-white">{currentTrack.title}</p>
          <p className="text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Center Section: Playback Controls */}
      <div className="flex-grow flex flex-col items-center gap-2 max-w-xl">
        <div className="flex items-center gap-2 md:gap-3">
          <Button variant="ghost" size="icon" onClick={handleShuffleToggle} className={isShuffle ? 'text-blue-400' : 'text-neutral-400 hover:text-white'}>
            <Shuffle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handlePreviousTrack} className="text-neutral-300 hover:text-white">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handlePlayPause} className="bg-white text-black hover:bg-neutral-200 rounded-full h-9 w-9 p-2">
            {isPlaying ? <Pause className="h-5 w-5 fill-black" /> : <Play className="h-5 w-5 fill-black" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextTrack} className="text-neutral-300 hover:text-white">
            <SkipForward className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleRepeatToggle} className={repeatMode !== 'off' ? 'text-blue-400' : 'text-neutral-400 hover:text-white'}>
            {repeatMode === 'one' ? <Repeat1 className="h-5 w-5" /> : <Repeat className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full px-2">
          <span className="text-xs text-neutral-400 w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration || 1} // Ensure max is at least 1 to prevent errors
            step={1}
            onValueChange={handleSeek}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:h-1" // Slimmer slider
            disabled={!duration}
          />
          <span className="text-xs text-neutral-400 w-10 text-left">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Section: Volume Control */}
      <div className="flex items-center gap-2 w-1/4 min-w-[150px] md:w-[200px] justify-end">
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-neutral-300 hover:text-white">
          {getVolumeIcon()}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24 md:w-32 [&>span:first-child]:h-1 [&>span:first-child>span]:h-1" // Slimmer slider
        />
      </div>
    </div>
  );
};

export default PlaybackControls;