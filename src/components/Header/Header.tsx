import s from './Header.module.scss';
import { Inter } from 'next/font/google';
import instIcon from '../../../public/icon-inst.svg';
import spotyIcon from '../../../public/icon-spoty.svg';
import yIcon from '../../../public/icon-y.svg';
import photoPlayer from '../../../public/player-photo.png';
import prevIcon from '../../../public/icon-prev.svg';

import playIcon from '../../../public/icon-play.svg';

import nextIcon from '../../../public/icon-next.png';

import arrayIcon from '../../../public/Group 108.svg';
import Image from 'next/image';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // по желанию
});

export default function Header() {
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
          <div className={s.header_player_circle}>
            <Image className={s.header_player_circle_icon} src={arrayIcon} alt="Array Icon" />
          </div>

          <div className={s.header_player_top}>
            <Image src={photoPlayer} alt="Player Photo" />
            <div className={s.header_player_info}>
              <span className={s.header_player_info_title}>Song Title</span>
              <span className={s.header_player_info_artist}>Artist Name</span>
            </div>
          </div>
          <div className={s.header_player_controls}>
            <div className={s.header_player_buttons}>
              <button className={s.header_player_button}>
                <Image src={prevIcon} alt="Previous" />
              </button>
              <button className={s.header_player_button_play}>
                <Image src={playIcon} alt="Play" />
              </button>
              <button className={s.header_player_button}>
                <Image src={nextIcon} alt="Next" />
              </button>
            </div>
            <input
              type="range"
              className={s.header_player_slider}
              min="0"
              max="100"
              defaultValue="50"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
