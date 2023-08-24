"use client";

import useTracks from "@/hooks/useTracks";
import { Alert, Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { useSearch } from "@/app/providers/SearchContextProvider";
import Track from "./Track";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";
import Player from "../Player";
import { Container, CurrentTrack, MainContainer, Tracks } from "@/ui/Main";
import ScreenLoader from "@/ui/Loader";

const Main = () => {
  const theme = useTheme();

  const { searchInput } = useSearch();

  const {
    currentPlaylist,
    currentItems,
    currentTrack,
    playlists,
    setCurrentTrack,
  } = usePlaylists();

  const { data: searchedItems, isLoading, error } = useTracks(searchInput);

  const mainColor = currentPlaylist
    ? playlists.find((playlist) => playlist.name === currentPlaylist)?.color
    : theme.palette.info.main;

  const data = currentPlaylist ? currentItems : searchedItems;

  const playNext = () => {
    const currentTrackIndex = data.findIndex(
      (item) => item.id === currentTrack?.id
    );
    const nextTrackIndex =
      currentTrackIndex < data.length - 1 ? currentTrackIndex + 1 : 0;

    setCurrentTrack(data[nextTrackIndex]);
  };

  const playPrevious = () => {
    const currentTrackIndex = data.findIndex(
      (item) => item.id === currentTrack?.id
    );
    const previousTrackIndex =
      currentTrackIndex !== 0 ? currentTrackIndex - 1 : data.length - 1;

    setCurrentTrack(data[previousTrackIndex]);
  };

  const biggerSize = useMediaQuery("(min-width: 450px)");

  return (
    <MainContainer mainclr={mainColor as string}>
      {error && (
        <Alert severity="error" color="error">
          {error}
        </Alert>
      )}
      <Container gap={2}>
        <CurrentTrack show={currentTrack ? 1 : 0} gap={2}>
          {currentTrack && (
            <Image
              src={
                currentTrack?.album?.cover_big ?? data?.[0]?.album?.cover_big
              }
              alt="current track"
              width={biggerSize ? 100 : 50}
              height={biggerSize ? 100 : 50}
              unoptimized
            />
          )}
          <Stack>
            <Stack textAlign="start" gap={1}>
              <Box
                fontWeight={700}
                fontSize={useMediaQuery("(min-width: 450px)") ? 20 : 14}
              >
                {currentTrack?.title ?? data?.[0]?.title}
              </Box>
              <Box fontSize={useMediaQuery("(min-width: 450px)") ? 16 : 10}>
                {currentTrack?.artist?.name ?? data?.[0]?.artist.name}
              </Box>
            </Stack>
          </Stack>
        </CurrentTrack>
        {isLoading ? (
          <ScreenLoader />
        ) : (
          <Tracks gap={1}>
            {data?.map((track) => (
              <Track key={track.id} track={track} />
            ))}
          </Tracks>
        )}
      </Container>
      <Player onPlayNext={playNext} onPlayPrevious={playPrevious} />
    </MainContainer>
  );
};

export default Main;
