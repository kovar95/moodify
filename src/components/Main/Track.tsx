import { Box, IconButton, Stack, styled } from "@mui/material";
import Image from "next/image";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import { getDuration } from "@/utils/getDuration";
import { Track } from "@/types/Track";
import { FC, useState } from "react";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";
import AddToPlaylist from "./AddToPlaylist";

type Props = {
  track: Track;
};

const StyledTrack = styled(Stack)(() => ({
  height: "50px",
  maxWidth: "600px",
  // width: "49%",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "10px 5px",
  borderRadius: "50px 5px 5px 50px",
  backgroundColor: "#ffffff66",
  position: "relative",
  "&:hover": {
    opacity: 0.8,
  },
}));

const StyledDetails = styled(Box)(() => ({
  width: "40px",
  height: "40px",
  "& img": {
    borderRadius: "50px",
  },
  cursor: "pointer",
}));

const StyledPlaylists = styled(Stack)(() => ({
  position: "absolute",
  color: "white",
  right: "45px",
  top: 0,
  backgroundColor: "#00000052",
  zIndex: 1,
  width: "200px",
  gap: 1,
  borderRadius: "5px",
  fontSize: 12,
  padding: 4,
}));

const StyledPlaylist = styled(Stack)(() => ({
  overflow: "scroll",
  padding: "4px",
  backgroundColor: "#1a1313fc",
  borderRadius: "5px",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

const StyledPlayButton = styled(PlayCircleFilledOutlinedIcon)(() => ({
  backgroundColor: "#8e8e8e",
  position: "absolute",
  borderRadius: "50px",
  left: "5px",
  top: "5px",
  width: "40px",
  height: "40px",
  opacity: 0,
  color: "white",
  "&:hover": {
    opacity: 0.7,
  },
}));

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

  const isInPlaylist = (playlistName: string) =>
    playlists
      .find((playlist) => playlist.name === playlistName)
      ?.items?.some((item) => item.id === id);

  const handlePlaylistAction = (playlistName: string) =>
    isInPlaylist(playlistName)
      ? removeTrackFromPlaylist(track, playlistName)
      : addTrackToPlaylist(track, playlistName);

  return (
    <StyledTrack
      key={id}
      sx={{
        backgroundColor: currentTrack?.id === id ? "#ffffffdb" : "",
        width: { xs: "100%", md: "49%" },
      }}
    >
      <Stack alignItems="center" direction="row" gap={2}>
        <StyledDetails>
          <Image
            src={artist?.picture}
            alt={`${id}-artist`}
            width={40}
            height={40}
            unoptimized
          />
          <StyledPlayButton onClick={() => setCurrentTrack(track)} />
        </StyledDetails>
        <Stack sx={{fontSize: {xs: 12, sm: 18}}}>
          <Box fontWeight={700} overflow="hidden" sx={{maxHeight: {xs: 16, sm: 20}}}>
            {title}
          </Box>
          <Box maxHeight={18} overflow="hidden">
            {artist.name}
          </Box>
        </Stack>
      </Stack>
      <Stack alignItems="center" direction="row">
        <Box sx={{fontSize: {xs: 10, sm: 14}, width: {xs: 40, sm: 50}}}>
          {getDuration(duration)}
        </Box>
        <IconButton color="inherit" onClick={toggleFavourites}>
          {isFavourite ? (
            <FavoriteOutlinedIcon sx={{fontSize: {xs: "1rem", sm: "1.5rem"}}} />
          ) : (
            <FavoriteBorderOutlinedIcon sx={{fontSize: {xs: "1rem", sm: "1.5rem"}}} />
          )}
        </IconButton>
        <IconButton color="inherit" onClick={togglePlaylists}>
          <LibraryAddOutlinedIcon sx={{fontSize: {xs: "1rem", sm: "1.5rem"}}} />
        </IconButton>
      </Stack>
      {/* {playlistsOpened && (
        <StyledPlaylists>
          {playlists.map((playlist) => (
            <StyledPlaylist key={playlist.name}>
              <Stack>{playlist.name}</Stack>
              <Stack>
                <IconButton
                  size="small"
                  sx={{ padding: 0, color: "#848484" }}
                  onClick={() => handlePlaylistAction(playlist.name)}
                >
                  {isInPlaylist(playlist.name) ? (
                    <RemoveCircleOutlinedIcon color="error" />
                  ) : (
                    <AddCircleOutlinedIcon />
                  )}
                </IconButton>
              </Stack>
            </StyledPlaylist>
          ))}
        </StyledPlaylists>
      )} */}
      <AddToPlaylist open={playlistsOpened} track={track} onClose={togglePlaylists}/>
    </StyledTrack>
  );
};

export default Track;
