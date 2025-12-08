import { createContext, useContext, useState, ReactNode } from 'react';

interface CurrentTrack {
  title: string;
  artist: string;
  cover: string;
  audio: string;
  duration: string;
}

interface AudioContextType {
  currentTrack: CurrentTrack | null;
  setCurrentTrack: (track: CurrentTrack) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AudioContext.Provider value={{ currentTrack, setCurrentTrack, isPlaying, setIsPlaying }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
}
