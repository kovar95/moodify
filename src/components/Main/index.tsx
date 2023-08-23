"use client";

import useTracks from "@/hooks/useTracks";
import styles from "../../app/page.module.css";
import { Box, Stack, styled, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useSearch } from "@/app/providers/SearchContextProvider";
import Track from "./Track";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";
import Player from "../Player";
import { getDuration } from "@/utils/getDuration";

const CurrentTrack = styled(Stack)(() => ({
  // maxWidth: "26rem",
  // maxHeight: "32rem",
  padding: "20px",
  backgroundColor: "#ffffff66",
  borderRadius: "15px",
  position: "relative",
  flexDirection: "row",
  width: "100%",
  "& img": {
    borderRadius: "15px",
    // position: "relative !important",
  },
}));

const Main = () => {
  const { searchInput } = useSearch();
  const {
    currentPlaylist,
    currentItems,
    currentTrack,
    playlists,
    setCurrentTrack,
  } = usePlaylists();
  const { data: searchedItems } = useTracks(searchInput);

  const mainColor = currentPlaylist
    ? playlists.find((playlist) => playlist.name === currentPlaylist)?.color
    : "#71fab5";

  const data = currentPlaylist ? currentItems : searchedItems;

  console.log(data);

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

  return (
    <main
      className={styles.main}
      style={{ background: `linear-gradient(${mainColor}, black)` }}
    >
      <Stack
        // direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <CurrentTrack
          sx={{ display: { xs: currentTrack ? "flex" : "none", sm: "none" } }}
          gap={2}
        >
          <Image
            src={currentTrack?.album?.cover_big ?? data?.[0]?.album?.cover_big}
            alt="current track"
            width={useMediaQuery("(min-width: 450px)") ? 100 : 50}
            height={useMediaQuery("(min-width: 450px)") ? 100 : 50}
            // objectFit="cover"
            // fill
            // style={{position: "relative"}}
            unoptimized
          />
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
        <Stack
          gap={1}
          direction="column"
          maxHeight="75vh"
          overflow="scroll"
          flexWrap="wrap"
          width="100%"
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: { xs: "nowrap", sm: "wrap" },
            justifyContent: { xs: "", sm: "space-around" },
          }}
        >
          {data?.map((track) => (
            <Track key={track.id} track={track} />
          ))}
        </Stack>
      </Stack>
      <Player onPlayNext={playNext} onPlayPrevious={playPrevious} />
    </main>
  );
};

export default Main;
