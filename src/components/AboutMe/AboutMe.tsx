'use client';

import Image from 'next/image';
import s from './AboutMe.module.scss';
import aboutTitle from '../../../public/util/adlinp.png';
import spotyIcon from '../../../public/icons/icon-spoty.svg';
import yIcon from '../../../public/icons/icon-y.svg';
import { FaPlay } from 'react-icons/fa';
import song from '../../../public/songs-img/song6.png';
import prevIcon from '../../../public/icons/icon-prev.svg';
import nextIcon from '../../../public/icons/icon-next.png';
import { useAudio } from '@/contexts/AydioContext';

export default function AboutMe() {
  const { currentTrack } = useAudio();
  return (
    <div className={s.about}>
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
              <button className={s.about_infoBlock_buttonPlay}>
                <FaPlay size={15} />
                Слушать
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
              <li className={s.about_content_left_item}>
                <Image src={song} alt="Song" />
                <div className={s.about_content_left_item_info}>
                  <p className={s.about_content_left_item_info_name}>Останься</p>
                  <p className={s.about_content_left_item_info_artist}>АДЛИН</p>
                </div>
                <div className={s.about_content_left_item_durationc}>
                  <span className={s.about_content_left_item_duration}>2:05</span>
                </div>{' '}
              </li>
              <li className={s.about_content_left_item}>
                <Image src={song} alt="Song" />
                <div className={s.about_content_left_item_info}>
                  <p className={s.about_content_left_item_info_name}>Останься</p>
                  <p className={s.about_content_left_item_info_artist}>АДЛИН</p>
                </div>
                <div className={s.about_content_left_item_durationc}>
                  <span className={s.about_content_left_item_duration}>2:05</span>
                </div>{' '}
              </li>
              <li className={s.about_content_left_item}>
                <Image src={song} alt="Song" />
                <div className={s.about_content_left_item_info}>
                  <p className={s.about_content_left_item_info_name}>Останься</p>
                  <p className={s.about_content_left_item_info_artist}>АДЛИН</p>
                </div>
                <div className={s.about_content_left_item_durationc}>
                  <span className={s.about_content_left_item_duration}>2:05</span>
                </div>{' '}
              </li>
              <li className={s.about_content_left_item}>
                <Image src={song} alt="Song" />
                <div className={s.about_content_left_item_info}>
                  <p className={s.about_content_left_item_info_name}>Останься</p>
                  <p className={s.about_content_left_item_info_artist}>АДЛИН</p>
                </div>
                <div className={s.about_content_left_item_durationc}>
                  <span className={s.about_content_left_item_duration}>2:05</span>
                </div>{' '}
              </li>
              <li className={s.about_content_left_item}>
                <Image src={song} alt="Song" />
                <div className={s.about_content_left_item_info}>
                  <p className={s.about_content_left_item_info_name}>Останься</p>
                  <p className={s.about_content_left_item_info_artist}>АДЛИН</p>
                </div>
                <div className={s.about_content_left_item_durationc}>
                  <span className={s.about_content_left_item_duration}>2:05</span>
                </div>
              </li>
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
              <p className={s.about_content_center_names_title}>{currentTrack?.title}</p>
              <p className={s.about_content_center_names_artist}>{currentTrack?.artist}</p>
              <span className={s.about_content_center_names_duration}>
                {currentTrack?.duration}
              </span>
            </div>
            <div className={s.about_content_center_controls}>
              <button className={s.about_content_center_button}>
                <Image src={prevIcon} alt="prevIcon" />
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
