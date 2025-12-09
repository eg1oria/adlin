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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function Header() {
  const { currentTrack, togglePlay, playTrack, isPlaying, currentTime, duration, seekTo } =
    useAudio();

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    seekTo(newTime);
  };
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const topSongs = songs.slice(0, 5);

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
  const handlePlay = () => {
    const randomSong = Math.floor(Math.random() * 5) + 1;
    if (currentTrack) {
      togglePlay();
    } else {
      const first = topSongs[randomSong];

      if (first)
        playTrack({
          title: first.title,
          artist: first.artist,
          cover: first.cover,
          audio: first.audio,
        });
    }
  };
  return (
    <header className={`${s.header} ${inter.className}`}>
      <div className={s.container}>
        <nav className={s.header_nav}>
          <ul className={s.header_nav_list}>
            <li className={s.header_nav_item}>ABOUT ME</li>
            <li className={s.header_nav_item}>MY MUSIC</li>
            <li className={s.header_nav_item}>CONTACTS</li>
          </ul>
          <ul className={s.header_nav_list}>
            <li className={s.header_nav_item}>
              <Image src={instIcon} alt="Instagram Icon" />
            </li>
            <li className={s.header_nav_item}>
              <Image src={spotyIcon} alt="Spotify Icon" />
            </li>
            <li className={s.header_nav_item}>
              <Image src={yIcon} alt="yIcon" />
            </li>
          </ul>
        </nav>
        <div className={s.header_player}>
          <div className={s.header_player_top}>
            <Image
              key={songs[0].id}
              src={currentTrack?.cover || '/util/fallback.webp'}
              alt="Player Photo"
              width={60}
              height={60}
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
              <button className={s.header_player_button} onClick={handlePrev}>
                <Image src={prevIcon} alt="Previous" />
              </button>
              <button className={s.header_player_button} onClick={handlePlay}>
                {isPlaying && currentTrack ? <FaPause size={15} /> : <FaPlay size={15} />}
              </button>
              <button className={s.header_player_button} onClick={handleNext}>
                <Image src={nextIcon} alt="Next" />
              </button>
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
        </div>
      </div>
    </header>
  );
}
