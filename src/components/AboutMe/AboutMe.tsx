'use client';

import { useRef } from 'react';
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
    currentTime,
    duration,
    formatTime,
    togglePlay,
    playTrack,
    seekTo,
  } = useAudio();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const topSongs = songs.slice(0, 5);

  const handleCenterPlayPause = () => {
    const randomTrack = Math.floor(Math.random() * 5) + 1;
    if (currentTrack) {
      togglePlay();
    } else {
      const first = topSongs[randomTrack];
      if (first)
        playTrack({
          title: first.title,
          artist: first.artist,
          cover: first.cover,
          audio: first.audio,
        });
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    seekTo(newTime);
  };

  function handlePrev() {
    if (!currentTrack) return;

    const currentIndex = songs.findIndex((i) => i.audio === currentTrack.audio);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex - 1) % songs.length;
    if (nextIndex === -1) return;
    const nextTrack = songs[nextIndex];
    playTrack(nextTrack);
  }

  function handleNext() {
    if (!currentTrack) return;

    const currentIndex = songs.findIndex((t) => t.audio === currentTrack.audio);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % songs.length;
    const nextTrack = songs[nextIndex];
    playTrack(nextTrack);
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={s.about}>
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
              <button className={s.about_infoBlock_buttonPlay} onClick={handleCenterPlayPause}>
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
                src={currentTrack?.cover || '/util/fallback.webp'}
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
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div onClick={handleSeek} className={s.progressBarCont}>
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
              <button className={s.about_content_center_button} onClick={handlePrev}>
                <Image src={prevIcon} alt="prevIcon" />
              </button>
              <button className={s.about_content_center_button} onClick={handleCenterPlayPause}>
                {isPlaying && currentTrack ? (
                  <FaPause
                    size={20}
                    style={{
                      color: 'white',
                    }}
                  />
                ) : (
                  <FaPlay
                    size={20}
                    style={{
                      color: 'white',
                    }}
                  />
                )}
              </button>
              <button className={s.about_content_center_button} onClick={handleNext}>
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
