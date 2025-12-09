// src/components/MyMusic/AudioPlayer.tsx
'use client';
import React from 'react';
import s from './AudioPlayer.module.scss';
import Image from 'next/image';
import { useAudio } from '@/contexts/AydioContext';

interface AudioPlayerProps {
  src: string;
  title: string;
  artist: string;
  cover: string;
}

export default function AudioPlayer({ src, title, artist, cover }: AudioPlayerProps) {
  const { currentTrack, isPlaying, currentTime, duration, formatTime, playTrack, togglePlay } =
    useAudio();

  const isThisTrackPlaying = isPlaying && currentTrack?.audio === src;

  const handleClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (currentTrack?.audio === src) {
      togglePlay();
    } else {
      playTrack({ title, artist, cover, audio: src });
    }
  };

  return (
    <div className={s.player}>
      <button
        onClick={handleClick}
        className={`${s.playButton} ${isThisTrackPlaying ? s.playing : ''}`}>
        <Image src={cover} alt="Song Image" width={60} height={60} />
        <div className={s.info}>
          <p className={s.title}>{title}</p>
          <p className={s.artist}>{artist}</p>
        </div>

        <div className={s.controls}>
          <span className={s.time}>{isThisTrackPlaying ? formatTime(currentTime) : '0:00'}-:-</span>
          <span className={s.time}>
            {isThisTrackPlaying ? formatTime(duration) : formatTime(0)}
          </span>
        </div>
      </button>
    </div>
  );
}
