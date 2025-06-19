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
  const [isShuffle, setIsShuffle] = useState(false); // Shuffle logic not fully implemented beyond toggle
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [lastVolume, setLastVolume] = useState(0.75);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [shuffledPlaylist, setShuffledPlaylist] = useState<Track[]>(playlist); // For shuffle

  useEffect(() => {
    if (isShuffle) {
      // Create a shuffled version of the playlist, keeping current track at index 0 if possible
      const originalPlaylist = [...playlist];
      const current = originalPlaylist.splice(currentTrackIndex, 1)[0];
      const shuffled = originalPlaylist.sort(() => Math.random() - 0.5);
      if (current) {
        shuffled.unshift(current);
      }
      setShuffledPlaylist(shuffled);
      setCurrentTrackIndex(0); // Current track is now at the start of the shuffled list
      setCurrentTrack(shuffled[0] || null);
    } else {
      // Restore original order and find current track's original index
      setShuffledPlaylist([...playlist]);
      if (currentTrack) {
        const originalIndex = playlist.findIndex(track => track.id === currentTrack.id);
        setCurrentTrackIndex(originalIndex !== -1 ? originalIndex : 0);
      } else if (playlist.length > 0) {
        setCurrentTrackIndex(0);
        setCurrentTrack(playlist[0]);
      }
    }
  }, [isShuffle]);


  useEffect(() => {
    const audio = audioRef.current;
    const trackToPlay = isShuffle ? shuffledPlaylist[currentTrackIndex] : playlist[currentTrackIndex];
    setCurrentTrack(trackToPlay || null);

    if (audio && trackToPlay) {
      // Only change src if it's different, and reset time
      if (audio.src !== trackToPlay.audioSrc) {
        audio.src = trackToPlay.audioSrc;
        setCurrentTime(0); // Reset current time for new track
        setDuration(0); // Reset duration
      }
      // Autoplay if isPlaying is true
      if (isPlaying) {
        audio.load(); // Important to load new src
        audio.play().catch(error => console.error("Error playing new track:", error));
      }
    }
  }, [currentTrackIndex, isShuffle, shuffledPlaylist]); // playlist dependency removed as it's static here, added shuffledPlaylist

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && currentTrack) {
      audio.play().catch(error => console.error("Error playing audio:", error));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]); // currentTrack dependency added here

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
      } else { // 'all' or 'off' will advance to next track
        handleNextTrack(true); // Pass true to indicate it's an auto-next
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
  }, [volume, isMuted, repeatMode, currentTrack, isPlaying, handleNextTrack]); // Added currentTrack, isPlaying, handleNextTrack

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
    setLastVolume(newVolume > 0 ? newVolume : lastVolume); // Store last non-zero volume
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      audioRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    if (isMuted) { // Unmuting
      const newVolume = lastVolume > 0 ? lastVolume : 0.1;
      setIsMuted(false);
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = newVolume;
      }
    } else { // Muting
      if (volume > 0) setLastVolume(volume); // Save current volume only if it's not already 0
      setIsMuted(true);
      // setVolume(0); // Visually set slider to 0, but handleVolumeChange does this
      if (audioRef.current) {
        audioRef.current.muted = true;
        // audioRef.current.volume = 0; // Muting is enough
      }
    }
  };
  
  const handleNextTrack = useCallback((autoNext = false) => {
    const currentPlaylist = isShuffle ? shuffledPlaylist : playlist;
    if (currentPlaylist.length === 0) return;

    let nextIndex = currentTrackIndex + 1;
    
    if (repeatMode === 'off' && nextIndex >= currentPlaylist.length && autoNext) {
      // If 'off' and end of playlist reached by auto-next, stop playing
      setIsPlaying(false);
      setCurrentTime(0);
      // Optionally, reset to first track without playing:
      // setCurrentTrackIndex(0); 
      // setCurrentTrack(currentPlaylist[0]);
      // audioRef.current?.pause();
      // audioRef.current.currentTime = 0;
      return;
    }
    
    if (nextIndex >= currentPlaylist.length) {
      nextIndex = 0; // Wrap around
    }
    setCurrentTrackIndex(nextIndex);
    if (autoNext && isPlaying === false && nextIndex === 0 && repeatMode !== 'all') {
        // If it wrapped around due to autoNext and was not playing or not on repeat all, don't start playing.
        // Except if repeatMode is 'all', it should continue.
    } else {
        setIsPlaying(true); // Continue playing for manual next or if repeating all
    }
  }, [currentTrackIndex, isShuffle, shuffledPlaylist, playlist, repeatMode, isPlaying]);


  const handlePreviousTrack = () => {
    const currentPlaylist = isShuffle ? shuffledPlaylist : playlist;
    if (currentPlaylist.length === 0) return;

    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) {
      prevIndex = currentPlaylist.length - 1; // Wrap around
    }
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true); // Start playing previous track
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
      <div className="bg-neutral-800 text-neutral-400 p-3 h-[88px] flex items-center justify-center w-full border-t border-neutral-700">
        No tracks available.
        <audio ref={audioRef} />
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 text-white p-3 h-[88px] flex items-center justify-between w-full border-t border-neutral-700">
      <audio ref={audioRef} preload="metadata" />
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
          <Button variant="ghost" size="icon" onClick={handlePreviousTrack} className="text-neutral-300 hover:text-white" disabled={playlist.length <= 1}>
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handlePlayPause} className="bg-white text-black hover:bg-neutral-200 rounded-full h-9 w-9 p-2">
            {isPlaying ? <Pause className="h-5 w-5 fill-black" /> : <Play className="h-5 w-5 fill-black" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleNextTrack(false)} className="text-neutral-300 hover:text-white" disabled={playlist.length <= 1}>
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
            max={duration > 0 ? duration : 1} 
            step={1}
            onValueChange={handleSeek}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:h-1" 
            disabled={!currentTrack || duration === 0}
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
          className="w-24 md:w-32 [&>span:first-child]:h-1 [&>span:first-child>span]:h-1"
        />
      </div>
    </div>
  );
};

export default PlaybackControls;