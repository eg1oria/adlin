'use state';

import songs from '../../db/songs.json';
import albums from '../../db/albums.json';
import Image from 'next/image';
import s from './Album.module.scss';
import Link from 'next/link';
import AudioPlayerAlbum from '@/components/AudioPlayerAlbum/AudioPlayerAlbum';

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const albumId = Number(id);

  const album = albums.find((a) => a.id === albumId);

  if (!album) return <p>Альбом не найден</p>;

  const albumTracks = songs.filter((song) => album.tracks.includes(song.id));

  return (
    <div
      className={s.album}
      style={{
        background: `linear-gradient(180deg, ${album.color1} 0%, ${album.color2} 100%)`,
      }}>
      <div className={s.album_left}>
        <Link href={'/'} className={s.album_left_button}>
          Назад
        </Link>
      </div>
      <div className={s.album_right}>
        <div className={s.album_right_imgWrap}>
          <Image src={album.cover} alt={album.title} width={250} height={250} />
          <div className={s.album_right_imgWrap_titles}>
            <p className={s.album_right_imgWrap_type}>{album.type}</p>
            <h1 className={s.album_right_imgWrap_title}>{album.title}</h1>
            <p className={s.album_right_imgWrap_autor}>
              {album.author}{' '}
              <span className={s.album_right_imgWrap_info}>
                ▸ {album.year} ▸ {albumTracks.length} треков
              </span>
            </p>
          </div>
        </div>

        <h2 className={s.album_text}>Треки</h2>

        <ul style={{ marginTop: 20 }}>
          {albumTracks.map((track, i) => (
            <li key={track.id} style={{ marginBottom: 20 }}>
              <AudioPlayerAlbum
                src={track.audio}
                title={track.title}
                artist={track.artist}
                id={i + 1}
                cover={track.cover}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
