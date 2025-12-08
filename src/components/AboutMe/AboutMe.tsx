'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import s from './AboutMe.module.scss';
import aboutTitle from '../../../public/util/adlinp.png';
import spotyIcon from '../../../public/icons/icon-spoty.svg';
import yIcon from '../../../public/icons/icon-y.svg';
import { FaPlay, FaPause } from 'react-icons/fa';
import prevIcon from '../../../public/icons/icon-prev.svg';
import nextIcon from '../../../public/icons/icon-next.png';
import { useAudio } from '@/contexts/AydioContext';
import songs from '../../db/songs.json';
import AudioPlayer from '../MyMusic/AudioPlayer';

export default function AboutMe() {
  const {
    currentTrack,
    isPlaying,
    setIsPlaying,
    setCurrentTrack,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    formatTime,
  } = useAudio();

  const audioRef = useRef<HTMLAudioElement>(null);
  const topSongs = songs.slice(0, 5);

  // Синхронизация audio элемента с состоянием
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // Обновление времени и длительности
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, setCurrentTime, setDuration, setIsPlaying]);

  // Включить случайный трек
  const handlePlayRandomTrack = () => {
    if (isPlaying && currentTrack) {
      setIsPlaying(false);
    } else if (!isPlaying && currentTrack) {
      setIsPlaying(true);
    } else {
      const randomIndex = Math.floor(Math.random() * songs.length);
      const randomSong = songs[randomIndex];

      setCurrentTrack({
        title: randomSong.title,
        artist: randomSong.artist,
        cover: randomSong.cover,
        audio: randomSong.audio,
        duration: randomSong.duration || '0:00',
      });
      setIsPlaying(true);
    }
  };

  // Переключение play/pause для центрального плеера
  const handleCenterPlayPause = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  // Перемотка трека по клику на прогресс-бар
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    const newTime = (percentage / 100) * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={s.about}>
      {/* Скрытый audio элемент для воспроизведения */}
      {currentTrack && <audio ref={audioRef} src={currentTrack.audio} preload="metadata" />}

      <div className={s.about_container}>
        <div className={s.about_tags}>
          <p className={s.about_tag}>[ ABOUT ME ]</p>
          <p className={s.about_tag}>[ ABOUT ME ]</p>
        </div>

        <div className={s.about_titles}>
          <Image src={aboutTitle} alt="About Me" />
          <div className={s.about_infoBlock}>
            <p className={s.about_infoBlock_role}>ИСПОЛНИТЕЛЬ</p>
            <p className={s.about_infoBlock_name}>ADLIN</p>
            <p className={s.about_infoBlock_count}>1 982 567 слушателей в месяц</p>
            <div className={s.about_infoBlock_buttons}>
              <button className={s.about_infoBlock_buttonPlay} onClick={handlePlayRandomTrack}>
                {isPlaying && currentTrack ? <FaPause size={15} /> : <FaPlay size={15} />}
                {isPlaying && currentTrack ? 'Пауза' : 'Слушать'}
              </button>
              <button className={s.about_infoBlock_buttonsSpotyf}>
                <Image src={spotyIcon} alt="Spotify" />
              </button>
              <button className={s.about_infoBlock_buttonsY}>
                <Image src={yIcon} alt="YouTube" />
              </button>
            </div>
          </div>
        </div>
        <div className={s.about_content}>
          <div className={s.about_content_left}>
            <h3 className={s.about_content_left_title}>Популярные треки</h3>
            <ul className={s.about_content_left_list}>
              {topSongs.map((song) => (
                <li key={song.id} className={s.about_content_left_item}>
                  <AudioPlayer
                    src={song.audio}
                    title={song.title}
                    artist={song.artist}
                    cover={song.cover}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={s.about_content_center}>
            <div className={s.imageWrapper}>
              <Image
                src={currentTrack?.cover || '/util/fallback.png'}
                alt="Center Image"
                fill
                className={s.about_content_center_image}
              />
            </div>
            <div className={s.about_content_center_names}>
              <p className={s.about_content_center_names_title}>
                {currentTrack?.title || 'Выберите трек'}
              </p>
              <p className={s.about_content_center_names_artist}>{currentTrack?.artist || ''}</p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: '#999',
                  margin: '15px 0 0 0',
                }}>
                <span>{formatTime ? formatTime(currentTime) : '0:00'}</span>
                <span>{formatTime ? formatTime(duration) : '0:00'}</span>
              </div>
              <div
                onClick={handleSeek}
                style={{
                  width: '100%',
                  height: '4px',
                  backgroundColor: '#333',
                  borderRadius: '2px',
                  margin: '10px 0 0 0',
                  cursor: 'pointer',
                  position: 'relative',
                }}>
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#1d68b9ff',
                    borderRadius: '2px',
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>
            </div>
            <div className={s.about_content_center_controls}>
              <button className={s.about_content_center_button}>
                <Image src={prevIcon} alt="prevIcon" />
              </button>
              <button className={s.about_content_center_button} onClick={handleCenterPlayPause}>
                {isPlaying && currentTrack ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>
              <button className={s.about_content_center_button}>
                <Image src={nextIcon} alt="nextIcon" />
              </button>
            </div>
          </div>

          <div className={s.about_content_right}>
            <p className={s.about_content_right_text}>
              Adlin — артист с атмосферным звучанием, который сочетает меланхолию, честные тексты и
              электронную эстетику. Его музыка — это эмоции, пропущенные через холодные биты и
              интимный саунд.
            </p>
            <p className={s.about_content_right_janres}>
              Indie Pop • Alt Pop • Bedroom Pop • Electronic • Dream Pop
            </p>

            <div className={s.about_content_right_info}>
              <span className={s.about_content_right_info_text}>1.9M+ слушателей в месяц</span>
              <span className={s.about_content_right_info_text}>
                35M+ стримов на всех платформах
              </span>
              <span className={s.about_content_right_info_text}>20K+ подписчиков</span>
              <span className={s.about_content_right_info_text}>5 релизов</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
