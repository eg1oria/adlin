'use client';

import prevIcon from '../../../public/icons/icon-prev.svg';
import nextIcon from '../../../public/icons/icon-next.png';
import Image from 'next/image';
import songs from '../../db/songs.json';
import { useAudio } from '@/contexts/AydioContext';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useCallback, useMemo } from 'react';
import s from './PlayerHead.module.scss';

const TOP_SONGS_COUNT = 5;
export default function PlayerHead() {
  const { currentTrack, togglePlay, playTrack, isPlaying, currentTime, duration, seekTo } =
    useAudio();

  const topSongs = useMemo(() => songs.slice(0, TOP_SONGS_COUNT), []);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      seekTo(newTime);
    },
    [duration, seekTo],
  );

  const progress = useMemo(
    () => (duration > 0 ? (currentTime / duration) * 100 : 0),
    [currentTime, duration],
  );

  const handlePrev = useCallback(() => {
    if (!currentTrack) return;

    const currentIndex = songs.findIndex((song) => song.audio === currentTrack.audio);
    if (currentIndex <= 0) return;

    const prevIndex = currentIndex - 1;
    const prevTrack = songs[prevIndex];
    if (prevTrack) playTrack(prevTrack);
  }, [currentTrack, playTrack]);

  const handleNext = useCallback(() => {
    if (!currentTrack) return;

    const currentIndex = songs.findIndex((song) => song.audio === currentTrack.audio);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % songs.length;
    const nextTrack = songs[nextIndex];
    if (nextTrack) playTrack(nextTrack);
  }, [currentTrack, playTrack]);

  const handlePlay = useCallback(() => {
    if (currentTrack) {
      togglePlay();
    } else {
      const randomIndex = Math.floor(Math.random() * topSongs.length);
      const randomSong = topSongs[randomIndex];

      if (randomSong) {
        playTrack({
          title: randomSong.title,
          artist: randomSong.artist,
          cover: randomSong.cover,
          audio: randomSong.audio,
        });
      }
    }
  }, [currentTrack, togglePlay, topSongs, playTrack]);
  return (
    <>
      <div className={s.player}>
        <div className={s.player_top}>
          <Image
            src={currentTrack?.cover || '/util/fallback2.png'}
            alt={currentTrack?.title || 'No track'}
            width={60}
            height={60}
            priority
          />
          <div className={s.player_info}>
            <span className={s.player_info_title}>{currentTrack?.title || 'Выберите трек'}</span>
            <span className={s.player_info_artist}>{currentTrack?.artist || ''}</span>
          </div>
        </div>

        <div className={s.player_controls}>
          <div className={s.player_buttons}>
            <button
              className={s.player_button}
              onClick={handlePrev}
              aria-label="Previous track"
              disabled={!currentTrack}>
              <Image src={prevIcon} alt="" width={20} height={20} />
            </button>
            <button
              className={s.player_button}
              onClick={handlePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying && currentTrack ? <FaPause size={15} /> : <FaPlay size={15} />}
            </button>
            <button
              className={s.player_button}
              onClick={handleNext}
              aria-label="Next track"
              disabled={!currentTrack}>
              <Image src={nextIcon} alt="" width={20} height={20} />
            </button>
          </div>

          <div onClick={handleSeek} className={s.progressBarCont} role="progressbar">
            <div className={s.progressBar} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </>
  );
}
