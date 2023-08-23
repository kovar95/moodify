import { Track } from "@/types/Track";
import {
  useState,
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useCallback,
} from "react";

type Playlist = {
  name: string;
  color: string;
  mood: string;
  items: Track[];
};

type PlaylistsContextType = {
  playlists: Playlist[];
  createPlaylist: (playlistData: Omit<Playlist, "items">) => void;
  removePlaylist: (playlistName: string) => void;
  addTrackToPlaylist: (track: Track, playlistName: string) => void;
  removeTrackFromPlaylist: (track: Track, playlistName: string) => void;
  currentPlaylist: string | null;
  setCurrentPlaylist: (playlistName: string | null) => void;
  currentItems: Track[];
  setCurrentTrack: (track: Track | null) => void;
  currentTrack: Track | null;
  currentColor: string;
};

export const PlaylistsContext = createContext<PlaylistsContextType>(
  {} as PlaylistsContextType
);

type Props = {
  children: ReactNode;
};

export default function PlaylistsContextProvider({
  children,
}: Props): React.ReactElement {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { name: "Favourites", mood: "favourite", color: "#71fab5", items: [] },
  ]);

  const [currentPlaylist, setCurrentPlaylist] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const createPlaylist = useCallback(
    ({ name, mood, color }: Omit<Playlist, "items">) => {
      if (playlists.some((pl) => pl.name === name)) {
        return;
      }
      setPlaylists((prevPlaylists) => [
        ...prevPlaylists,
        { name, mood, color, items: [] },
      ]);
    },
    [playlists]
  );

  const removePlaylist = (playlistName: string) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.filter((playlist) => playlist.name !== playlistName)
    );
  };

  const addTrackToPlaylist = (track: Track, playlistName: string) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) => {
        if (playlist.name !== playlistName) {
          return playlist;
        } else {
          return { ...playlist, items: [...playlist.items, track] };
        }
      })
    );
  };

  const removeTrackFromPlaylist = (track: Track, playlistName: string) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) => {
        if (playlist.name !== playlistName) {
          return playlist;
        } else {
          return {
            ...playlist,
            items: playlist.items.filter((item) => item.id !== track.id),
          };
        }
      })
    );
  };

  const currentItems = useMemo(
    () =>
      currentPlaylist
        ? playlists.find((playlist) => playlist.name === currentPlaylist)
            ?.items ?? []
        : [],
    [currentPlaylist, playlists]
  );

  const currentColor = useMemo(
    () =>
      currentPlaylist
        ? playlists.find((playlist) => playlist.name === currentPlaylist)
            ?.color ?? "#fff"
        : "#fff",
    [currentPlaylist, playlists]
  );

  const contextValues = useMemo(
    () => ({
      playlists,
      createPlaylist,
      removePlaylist,
      removeTrackFromPlaylist,
      addTrackToPlaylist,
      currentPlaylist,
      setCurrentPlaylist,
      currentItems,
      setCurrentTrack,
      currentTrack,
      currentColor,
    }),
    [
      createPlaylist,
      currentColor,
      currentItems,
      currentPlaylist,
      currentTrack,
      playlists,
    ]
  );

  return (
    <PlaylistsContext.Provider value={contextValues}>
      {children}
    </PlaylistsContext.Provider>
  );
}

export const usePlaylists = () => useContext(PlaylistsContext);
