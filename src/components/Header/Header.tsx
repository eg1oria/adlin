'use client';

import s from './Header.module.scss';
import { Inter } from 'next/font/google';
import instIcon from '../../../public/icons/icon-inst.svg';
import spotyIcon from '../../../public/icons/icon-spoty.svg';
import yIcon from '../../../public/icons/icon-y.svg';
import Image from 'next/image';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '700', '900'],
});

export default function Header() {
  return (
    <header className={`${s.header} ${inter.className}`}>
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
                href="https://www.instagram.com/mr.addlean?igsh=MTl4am5vOWFtdXhvdA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram">
                <Image src={instIcon} alt="" width={24} height={24} />
              </a>
            </li>
            <li className={s.header_nav_item}>
              <a
                href="https://open.spotify.com/artist/3vw4wtxW7yv7yJSDqkIuUz?si=CzRq5YVKSFKsS2o6J40j9w"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify">
                <Image src={spotyIcon} alt="" width={24} height={24} />
              </a>
            </li>
            <li className={s.header_nav_item}>
              <a
                href="https://music.yandex.ru/artist/7914739?ref_id=9B853EA2-C4FE-43E3-8CF3-3838F44CE3E0&utm_medium=copy_link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube">
                <Image src={yIcon} alt="" width={24} height={24} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
