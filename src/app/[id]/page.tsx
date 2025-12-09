import songs from '../../db/songs.json';
import albums from '../../db/albums.json';
import Image from 'next/image';
import AudioPlayer from '@/components/MyMusic/AudioPlayer';
import { AudioProvider } from '@/contexts/AydioContext';

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const albumId = Number(id);

  const album = albums.find((a) => a.id === albumId);

  if (!album) return <p>Альбом не найден</p>;

  const albumTracks = songs.filter((song) => album.tracks.includes(song.id));

  return (
    <AudioProvider>
      <div style={{ padding: 40 }}>
        <h1>{album.title}</h1>
        <p>
          {album.year} • {album.type}
        </p>

        <Image src={album.cover} alt={album.title} width={300} height={300} />

        <h2 style={{ marginTop: 30 }}>Треки</h2>

        <ul style={{ marginTop: 20 }}>
          {albumTracks.map((track) => (
            <li key={track.id} style={{ marginBottom: 20 }}>
              <AudioPlayer
                src={track.audio}
                title={track.title}
                artist={track.artist}
                cover={track.cover}
              />
            </li>
          ))}
        </ul>
      </div>
    </AudioProvider>
  );
}
