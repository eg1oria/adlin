'use client';
import React, { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react';
import songs from '../db/songs.json';
export interface CurrentTrack {
  title: string;
  artist: string;
  cover: string;
  audio: string;
  duration?: string;
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
  audioElement?: HTMLAudioElement | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playTrack = React.useCallback(
    (track: CurrentTrack) => {
      if (currentTrack && currentTrack.audio === track.audio) {
        setIsPlaying(true);
        return;
      }
      setCurrentTrack(track);
      setIsPlaying(true);
    },
    [currentTrack],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (!currentTrack) return;

      const currentIndex = songs.findIndex((t) => t.audio === currentTrack.audio);
      if (currentIndex === -1) return;

      const nextIndex = (currentIndex + 1) % songs.length;
      const nextTrack = songs[nextIndex];
      playTrack(nextTrack);
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentTrack, playTrack]);
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = typeof document !== 'undefined' ? document.createElement('audio') : null;
      if (audioRef.current) {
        audioRef.current.preload = 'metadata';
      }
    }

    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setCurrentTime(audio.currentTime || 0);
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentTrack) {
      if (audio.src !== currentTrack.audio) {
        audio.src = currentTrack.audio;
      }
      audio.load();
      if (isPlaying) {
        audio.play().catch((e) => {
          console.warn('Audio play failed:', e);
          setIsPlaying(false);
        });
      } else {
        audio.currentTime = 0;
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute('src');
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch((e) => {
        console.warn('Play failed', e);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying((p) => !p);
  };

  const seekTo = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const value: AudioContextType = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    formatTime,
    playTrack,
    togglePlay,
    seekTo,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
      <audio
        ref={(el) => {
          if (el && audioRef.current !== el) {
            audioRef.current = el;
          }
        }}
        style={{ display: 'none' }}
        preload="metadata"
      />
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
};
