import { Box, Stack } from "@mui/material";
import Image from "next/image";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { getDuration } from "@/utils/getDuration";
import { Track } from "@/types/Track";
import { FC, useState } from "react";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";
import AddToPlaylist from "./AddToPlaylist";
import {
  StyledDetails,
  StyledIconButton,
  PlayButton,
  StyledTrack,
} from "@/ui/Track";

type Props = {
  track: Track;
};

const Track: FC<Props> = ({ track }) => {
  const { id, duration, artist, title } = track;

  const [playlistsOpened, setPlaylistsOpened] = useState(false);

  const togglePlaylists = () => setPlaylistsOpened(!playlistsOpened);

  const {
    playlists,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    setCurrentTrack,
    currentTrack,
  } = usePlaylists();

  const isFavourite = playlists
    .find((playlist) => playlist.name === "Favourites")
    ?.items?.some((item) => item.id === id);

  const toggleFavourites = () =>
    isFavourite
      ? removeTrackFromPlaylist(track, "Favourites")
      : addTrackToPlaylist(track, "Favourites");

  return (
    <StyledTrack key={id} current={currentTrack?.id === id ? 1 : 0}>
      <Stack alignItems="center" direction="row" gap={2}>
        <StyledDetails>
          <Image
            src={artist?.picture}
            alt={`${id}-artist`}
            width={40}
            height={40}
            unoptimized
          />
          <PlayButton onClick={() => setCurrentTrack(track)} />
        </StyledDetails>
        <Stack sx={{ fontSize: { xs: 12, sm: 18 } }}>
          <Box
            fontWeight={700}
            overflow="hidden"
            sx={{ maxHeight: { xs: 16, sm: 20 } }}
          >
            {title}
          </Box>
          <Box maxHeight={18} overflow="hidden">
            {artist.name}
          </Box>
        </Stack>
      </Stack>
      <Stack alignItems="center" direction="row">
        <Box sx={{ fontSize: { xs: 10, sm: 14 }, width: { xs: 40, sm: 50 } }}>
          {getDuration(duration)}
        </Box>
        <StyledIconButton color="inherit" onClick={toggleFavourites}>
          {isFavourite ? (
            <FavoriteOutlinedIcon />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </StyledIconButton>
        <StyledIconButton color="inherit" onClick={togglePlaylists}>
          <LibraryAddOutlinedIcon />
        </StyledIconButton>
      </Stack>
      <AddToPlaylist
        open={playlistsOpened}
        track={track}
        onClose={togglePlaylists}
      />
    </StyledTrack>
  );
};

export default Track;
