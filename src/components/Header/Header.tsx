'use client';

import s from './Header.module.scss';
import { Inter } from 'next/font/google';
import instIcon from '../../../public/icons/icon-inst.svg';
import spotyIcon from '../../../public/icons/icon-spoty.svg';
import yIcon from '../../../public/icons/icon-y.svg';
import prevIcon from '../../../public/icons/icon-prev.svg';
import nextIcon from '../../../public/icons/icon-next.png';
import Image from 'next/image';
import songs from '../../db/songs.json';
import { useAudio } from '@/contexts/AydioContext';
import { FaPause, FaPlay } from 'react-icons/fa';
import { useEffect, useState, useCallback, useMemo } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '700', '900'],
});

const TOP_SONGS_COUNT = 5;
const SCROLL_HIDE_THRESHOLD = 780;

export default function Header() {
  const { currentTrack, togglePlay, playTrack, isPlaying, currentTime, duration, seekTo } =
    useAudio();

  const [isVisible, setIsVisible] = useState(true);

  const topSongs = useMemo(() => songs.slice(0, TOP_SONGS_COUNT), []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          setIsVisible(scrollPosition < SCROLL_HIDE_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`${s.header} ${inter.className} ${isVisible ? s.hide : s.show}`}>
      <div className={s.container}>
        <nav className={s.header_nav}>
          <ul className={s.header_nav_list}>
            <li className={s.header_nav_item}>
              <a href="#about">ABOUT ME</a>
            </li>
            <li className={s.header_nav_item}>
              <a href="#music">MY MUSIC</a>
            </li>
            <li className={s.header_nav_item}>
              <a href="#contacts">CONTACTS</a>
            </li>
          </ul>
          <ul className={s.header_nav_list}>
            <li className={s.header_nav_item}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram">
                <Image src={instIcon} alt="" width={24} height={24} />
              </a>
            </li>
            <li className={s.header_nav_item}>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify">
                <Image src={spotyIcon} alt="" width={24} height={24} />
              </a>
            </li>
            <li className={s.header_nav_item}>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube">
                <Image src={yIcon} alt="" width={24} height={24} />
              </a>
            </li>
          </ul>
        </nav>

        <div className={s.header_player}>
          <div className={s.header_player_top}>
            <Image
              src={currentTrack?.cover || '/util/fallback.webp'}
              alt={currentTrack?.title || 'No track'}
              width={60}
              height={60}
              priority
            />
            <div className={s.header_player_info}>
              <span className={s.header_player_info_title}>
                {currentTrack?.title || 'Song Title'}
              </span>
              <span className={s.header_player_info_artist}>
                {currentTrack?.artist || 'Artist Name'}
              </span>
            </div>
          </div>

          <div className={s.header_player_controls}>
            <div className={s.header_player_buttons}>
              <button
                className={s.header_player_button}
                onClick={handlePrev}
                aria-label="Previous track"
                disabled={!currentTrack}>
                <Image src={prevIcon} alt="" width={20} height={20} />
              </button>
              <button
                className={s.header_player_button}
                onClick={handlePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying && currentTrack ? <FaPause size={15} /> : <FaPlay size={15} />}
              </button>
              <button
                className={s.header_player_button}
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
      </div>
    </header>
  );
}
