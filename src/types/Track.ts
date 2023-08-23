type Artist = {
  picture: string;
  name: string;
};

type Album = {
  cover_big: string;
};

export type Track = {
  id: number;
  title: string;
  duration: number;
  preview: string;
  artist: Artist;
  album: Album;
};
