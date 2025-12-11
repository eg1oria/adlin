'use client';
import React, { memo } from 'react';
import s from './AudioPlayer.module.scss';
import { useAudio } from '@/contexts/AydioContext';

interface AudioPlayerProps {
  src: string;
  title: string;
  artist: string;
  cover: string;
  id: number;
}

const AudioPlayerAlbum = memo<AudioPlayerProps>(
  ({ src, title, artist, cover, id }) => {
    const { currentTrack, isPlaying, currentTime, duration, formatTime, playTrack, togglePlay } =
      useAudio();

    const isCurrentTrack = currentTrack?.audio === src;
    const isThisTrackPlaying = isPlaying && isCurrentTrack;

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (isCurrentTrack) {
        togglePlay();
      } else {
        playTrack({ title, artist, cover, audio: src });
      }
    };

    return (
      <div className={s.player}>
        <button
          onClick={handleClick}
          className={`${s.playButton} ${isThisTrackPlaying ? s.playing : ''}`}
          aria-label={isThisTrackPlaying ? `Pause ${title}` : `Play ${title}`}>
          <p className={s.player_id}>{id}</p>

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
      prev.cover === next.cover &&
      prev.id === next.id
    );
  },
);

AudioPlayerAlbum.displayName = 'AudioPlayerAlbum';

export default AudioPlayerAlbum;
