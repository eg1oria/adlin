'use client';

import s from './MyMusic.module.scss';
import albumImg from '../../../public/util/album-img.png';
import Image from 'next/image';
import songs from '../../db/songs.json';
import AudioPlayer from './AudioPlayer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function MyMusic() {
  const songsSlide1 = songs.slice(0, 9);
  const songsSlide2 = songs.slice(9, 18);

  return (
    <div className={s.music}>
      <div className={s.container}>
        <div className={s.music_tags}>
          <p className={s.music_tags_tag}>[ MY MUSIC ]</p>
          <p className={s.music_tags_tag}>[ MY MUSIC ]</p>
        </div>

        <div className={s.music_content}>
          <div className={s.music_content_albums}>
            <ul className={s.music_content_albums_filter}>
              <li className={s.music_content_albums_filter_item}>Альбомы</li>
              <li className={s.music_content_albums_filter_item}>Последние релизы</li>
              <li className={s.music_content_albums_filter_item}>Синглы</li>
            </ul>
            <div className={s.music_content_albums_list}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className={s.music_content_albums_list_item}>
                  <div className={s.music_content_albums_list_item_image}>
                    <Image
                      src={albumImg}
                      alt="Album Image"
                      className={s.music_content_albums_list_item_image_url}
                    />
                  </div>
                  <p className={s.music_content_albums_list_item_title}>Album Title</p>
                  <div className={s.music_content_albums_list_item_infos}>
                    <p className={s.music_content_albums_list_item_year}>2022 • Альбом</p>
                    <span className={s.music_content_albums_list_item_count}>13 треков</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.songsRelative}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              loop
              navigation={{
                nextEl: '.custom-next',
                prevEl: '.custom-prev',
              }}>
              <SwiperSlide>
                <ul className={s.music_content_songs}>
                  {songsSlide1.map((song) => (
                    <li key={song.id} className={s.music_content_songs_item}>
                      <AudioPlayer
                        src={song.audio}
                        title={song.title}
                        artist={song.artist}
                        cover={song.cover}
                      />
                    </li>
                  ))}
                </ul>
              </SwiperSlide>
              <SwiperSlide>
                <ul className={s.music_content_songs}>
                  {songsSlide2.map((song) => (
                    <li key={song.id} className={s.music_content_songs_item}>
                      <AudioPlayer
                        src={song.audio}
                        title={song.title}
                        artist={song.artist}
                        cover={song.cover}
                      />
                    </li>
                  ))}
                </ul>
              </SwiperSlide>
            </Swiper>

            <button className={`${s.customPrev} custom-prev`}>
              <IoIosArrowBack size={24} />
            </button>
            <button className={`${s.customNext} custom-next`}>
              <IoIosArrowForward size={24} />
            </button>
          </div>

          <p className={s.music_content_sup}>
            [ Spotify | Yandex | VK music | Apple music | Youtube ]
          </p>
        </div>
      </div>
    </div>
  );
}
