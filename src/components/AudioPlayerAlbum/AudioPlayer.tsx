'use client';
import React, { memo } from 'react';
import Image from 'next/image';
import s from './AudioPlayer.module.scss';
import { useAudio } from '@/contexts/AydioContext';

interface AudioPlayerProps {
  src: string;
  title: string;
  artist: string;
  cover: string;
}

const AudioPlayer = memo<AudioPlayerProps>(
  ({ src, title, artist, cover }) => {
    const { currentTrack, isPlaying, currentTime, duration, formatTime, playTrack, togglePlay } =
      useAudio();

    const isCurrentTrack = currentTrack?.audio === src;
    const isThisTrackPlaying = isPlaying && isCurrentTrack;

    const handleClick = () => {
      if (isCurrentTrack) {
        togglePlay();
      } else {
        playTrack({ title, artist, cover: cover || '', audio: src });
      }
    };

    return (
      <div className={s.player}>
        <button
          onClick={handleClick}
          className={`${s.playButton} ${isThisTrackPlaying ? s.playing : ''}`}
          aria-label={isThisTrackPlaying ? 'Pause' : 'Play'}>
          <Image
            src={cover}
            alt=""
            width={60}
            height={60}
            loading="lazy"
            className={s.playButton_img}
            quality={75}
          />

          <div className={s.info}>
            <p className={s.title}>{title}</p>
            <p className={s.artist}>{artist}</p>
          </div>

          <div className={s.controls}>
            {' '}
            <span className={s.time}>
              {isThisTrackPlaying ? formatTime(currentTime) : '0:00'}-:-
            </span>{' '}
            <span className={s.time}>
              {' '}
              {isThisTrackPlaying ? formatTime(duration) : formatTime(0)}{' '}
            </span>{' '}
          </div>
        </button>
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.src === next.src &&
      prev.title === next.title &&
      prev.artist === next.artist &&
      prev.cover === next.cover
    );
  },
);

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
