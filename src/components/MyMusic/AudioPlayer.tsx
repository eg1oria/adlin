'use client';

import { useState, useRef, useEffect } from 'react';
import s from './AudioPlayer.module.scss';
import { useAudio } from '@/contexts/AydioContext';
import Image from 'next/image';

interface AudioPlayerProps {
  src: string;
  title: string;
  artist: string;
  cover: string;
}

export default function AudioPlayer({ src, title, artist, cover }: AudioPlayerProps) {
  const {
    currentTrack,
    setCurrentTrack,
    isPlaying: globalIsPlaying,
    setIsPlaying: setGlobalIsPlaying,
  } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const isThisTrackPlaying = globalIsPlaying && currentTrack?.audio === src;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setGlobalIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setGlobalIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isThisTrackPlaying) {
      audio.play().catch((err) => console.error('Play error:', err));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isThisTrackPlaying]);

  const togglePlay = () => {
    if (isThisTrackPlaying) {
      setGlobalIsPlaying(false);
    } else {
      setCurrentTrack({ title, artist, cover, audio: src, duration: formatTime(duration) });
      setGlobalIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={s.player}>
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        onClick={togglePlay}
        className={`${s.playButton} ${isThisTrackPlaying ? s.playing : ''}`}>
        <Image src={cover} alt="Song Image" width={60} height={60} />
        <div className={s.info}>
          <p className={s.title}>{title}</p>
          <p className={s.artist}>{artist}</p>
        </div>

        <div className={s.controls}>
          <span className={s.time}>{formatTime(currentTime)}</span>/
          <span className={s.time}>{formatTime(duration)}</span>
        </div>
      </button>
    </div>
  );
}
