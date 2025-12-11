'use client';
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import songs from '../db/songs.json';

export interface CurrentTrack {
  title: string;
  artist: string;
  cover?: string;
  audio: string;
  duration?: string;
  id?: number;
}

interface AudioContextType {
  currentTrack: CurrentTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  formatTime: (seconds: number) => string;
  playTrack: (track: CurrentTrack) => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = useCallback((seconds: number): string => {
    if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const playTrack = useCallback((track: CurrentTrack) => {
    if (!audioRef.current) return;

    if (audioRef.current.src.endsWith(track.audio)) {
      audioRef.current.play().catch((e) => console.warn('Play failed:', e));
      setIsPlaying(true);
      return;
    }

    setCurrentTrack(track);
    setCurrentTime(0);
    audioRef.current.src = track.audio;
    audioRef.current.load();
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: 'ADLIN Music',
        artwork: [
          {
            src: track.cover || '/default-cover.jpg',
            sizes: '512x512',
            type: 'image/jpeg/png',
          },
        ],
      });
    }

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((e) => {
        console.warn('Play failed:', e);
        setIsPlaying(false);
      });
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn('Play failed:', e));
    }
  }, [isPlaying, currentTrack]);

  const seekTo = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        audioRef.current?.play();
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        audioRef.current?.pause();
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (!currentTrack) return;
        const index = songs.findIndex((t) => t.audio === currentTrack.audio);
        if (index > 0) {
          playTrack(songs[index - 1]);
        }
      });

      navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (!currentTrack) return;
        const index = songs.findIndex((t) => t.audio === currentTrack.audio);
        if (index !== -1 && index < songs.length - 1) {
          playTrack(songs[index + 1]);
        }
      });
    }
  }, [currentTrack, playTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      if (!currentTrack) return;

      const index = songs.findIndex((t) => t.audio === currentTrack.audio);
      if (index === -1) return;

      const nextIndex = (index + 1) % songs.length;
      playTrack(songs[nextIndex]);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentTrack, playTrack]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
  }, [isPlaying]);

  const value = useMemo<AudioContextType>(
    () => ({
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      formatTime,
      playTrack,
      togglePlay,
      seekTo,
    }),
    [currentTrack, isPlaying, currentTime, duration, formatTime, playTrack, togglePlay, seekTo],
  );

  return (
    <AudioContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" />
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
};
