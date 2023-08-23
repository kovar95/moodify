import { FC, useRef, useState } from "react";
import { Box, Button, IconButton, Slider, Stack, styled } from "@mui/material";
import SkipPreviousOutlinedIcon from "@mui/icons-material/SkipPreviousOutlined";
import SkipNextOutlinedIcon from "@mui/icons-material/SkipNextOutlined";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import useWavesurfer from "@/hooks/useWavesurfer";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";
import { getDuration } from "@/utils/getDuration";
import Image from "next/image";

const Wrapper = styled(Stack)(() => ({
  width: "100vw",
  height: "65px",
  flexDirection: "row",
  backgroundColor: "#1a1313fc",
  alignItems: "center",
  justifyContent: "space-between",
  paddingInline: 3,
  position: "fixed",
  right: 0,
  bottom: 0,
  zIndex: 3,
  color: "#bababa",
}));

const ActionButton = styled(IconButton)(() => ({
  width: "65px",
  height: "65px",
  color: "inherit",
}));

const VolumeSlider = styled(Slider)(() => ({
  position: "absolute",
  top: "-105px",
  right: "18px",
  height: "100px",
  color: "inherit",
}));

const TrackInfo = styled(Stack)(() => ({
  flexDirection: "row",
  paddingInline: 6,
  gap: 6,
  fontSize: 10,
  alignItems: "center",
  "& img": {
    borderRadius: 50,
  },
}));

type Props = {
  onPlayNext: () => void;
  onPlayPrevious: () => void;
};

const Player: FC<Props> = ({ onPlayNext, onPlayPrevious }) => {
  const [isVolumeSliderOpened, setVolumeSlider] = useState(false);
  const waveRef = useRef<HTMLDivElement | null>(null);

  const { currentTrack, currentColor, currentItems, setCurrentTrack } =
    usePlaylists();

  const { handlePlayPause, isPlaying, audioVolume, setAudioVolume } =
    useWavesurfer(
      waveRef,
      currentTrack?.preview,
      () => console.log("End"),
      currentColor
    );

  if (!currentTrack) {
    return null;
  }

  return (
    <Wrapper sx={{ borderTop: `1px solid ${currentColor}` }}>
      <TrackInfo sx={{ display: { xs: "none", sm: "flex" } }}>
        <Image
          src={currentTrack?.album?.cover_big}
          width={35}
          height={35}
          alt="current-album"
          unoptimized
        />
        <Stack sx={{ width: "90px" }}>
          <Box fontWeight={700}>{currentTrack?.title}</Box>
          <Box>{currentTrack?.artist?.name}</Box>
        </Stack>
      </TrackInfo>
      <Stack direction="row">
        <ActionButton
          disabled={!currentTrack}
          sx={{ width: { xs: 35, sm: 65 }, height: { xs: 35, sm: 65 } }}
          onClick={onPlayPrevious}
        >
          <SkipPreviousOutlinedIcon fontSize="large" />
        </ActionButton>
        <ActionButton
          onClick={handlePlayPause}
          disabled={!currentTrack}
          sx={{ width: { xs: 35, sm: 65 }, height: { xs: 35, sm: 65 } }}
        >
          {isPlaying ? (
            <PauseCircleFilledOutlinedIcon fontSize="large" />
          ) : (
            <PlayCircleFilledOutlinedIcon fontSize="large" />
          )}
        </ActionButton>
        <ActionButton
          disabled={!currentTrack}
          onClick={onPlayNext}
          sx={{ width: { xs: 35, sm: 65 }, height: { xs: 35, sm: 65 } }}
        >
          <SkipNextOutlinedIcon fontSize="large" />
        </ActionButton>
      </Stack>
      <Stack ref={waveRef} width="100%" paddingX={2} />
      <Stack fontSize={12} minWidth={42}>
        {getDuration(currentTrack?.duration)}
      </Stack>
      <Stack>
        <ActionButton
          disabled={!currentTrack}
          onClick={() => setVolumeSlider(!isVolumeSliderOpened)}
          sx={{ width: { xs: 35, sm: 65 }, height: { xs: 35, sm: 65 } }}
        >
          {audioVolume.isMuted ? (
            <VolumeOffIcon
              fontSize="large"
              sx={{
                width: { xs: "0.75em", sm: "1em" },
                height: { xs: "0.75em", sm: "1em" },
              }}
            />
          ) : (
            <VolumeUpOutlinedIcon
              fontSize="large"
              sx={{
                width: { xs: "0.75em", sm: "1em" },
                height: { xs: "0.75em", sm: "1em" },
              }}
            />
          )}
        </ActionButton>
        {isVolumeSliderOpened && (
          <VolumeSlider
            aria-label="Volume"
            orientation="vertical"
            value={audioVolume.value * 100}
            valueLabelDisplay="off"
            disabled={!currentTrack}
            color="secondary"
            onChange={(_e, value) =>
              setAudioVolume({
                isMuted: value === 0,
                value: (value as number) / 100,
              })
            }
          />
        )}
      </Stack>
    </Wrapper>
  );
};

export default Player;
