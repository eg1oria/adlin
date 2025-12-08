import s from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footer_container}>
        <div className={s.footer_content}>
          <div className={s.footer_content_col}>
            <h3 className={s.footer_content_col_title}>Booking & Cooperation:</h3>
            <p className={s.footer_content_col_text}>adlin.contacts@gmail.com</p>
            <p className={s.footer_content_col_text}>+7 (707) 000-00-00 </p>
            <p className={s.footer_content_col_text}>Telegram: @adlin_official</p>
          </div>
          <div className={s.footer_content_col}>
            <h3 className={s.footer_content_col_title}>Socials:</h3>
            <p className={s.footer_content_col_text}>Instagram</p>
            <p className={s.footer_content_col_text}>TikTok</p>
            <p className={s.footer_content_col_text}>VK</p>
            <p className={s.footer_content_col_text}>Telegram Channel</p>
          </div>
          <div className={s.footer_content_col}>
            <h3 className={s.footer_content_col_title}>Music Platforms:</h3>
            <p className={s.footer_content_col_text}>Spotify</p>
            <p className={s.footer_content_col_text}>Yandex Music</p>
            <p className={s.footer_content_col_text}>VK Music</p>
            <p className={s.footer_content_col_text}>YouTube Music</p>
            <p className={s.footer_content_col_text}>Apple Music</p>
            <p className={s.footer_content_col_text}>SoundCloud</p>
          </div>
          <div className={s.footer_content_col}>
            <h3 className={s.footer_content_col_title}>Management:</h3>
            <p className={s.footer_content_col_text}>@adlinteam (Telegram)</p>
          </div>
        </div>
      </div>
      <p className={s.footer_text}>© 2025 ADLIN. All rights reserved.</p>
    </footer>
  );
}
