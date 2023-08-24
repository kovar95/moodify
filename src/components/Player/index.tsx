import { FC, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
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
import { ActionButton, TrackInfo, VolumeSlider, Wrapper } from "@/ui/Player";

type Props = {
  onPlayNext: () => void;
  onPlayPrevious: () => void;
};

const Player: FC<Props> = ({ onPlayNext, onPlayPrevious }) => {
  const [isVolumeSliderOpened, setVolumeSlider] = useState(false);
  const waveRef = useRef<HTMLDivElement | null>(null);

  const { currentTrack, currentColor } = usePlaylists();

  const { handlePlayPause, isPlaying, audioVolume, setAudioVolume } =
    useWavesurfer(waveRef, currentTrack?.preview, currentColor);

  if (!currentTrack) {
    return null;
  }

  return (
    <Wrapper sx={{ borderTop: `1px solid ${currentColor}` }}>
      <TrackInfo>
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
        <ActionButton disabled={!currentTrack} onClick={onPlayPrevious}>
          <SkipPreviousOutlinedIcon fontSize="large" />
        </ActionButton>
        <ActionButton onClick={handlePlayPause} disabled={!currentTrack}>
          {isPlaying ? (
            <PauseCircleFilledOutlinedIcon fontSize="large" />
          ) : (
            <PlayCircleFilledOutlinedIcon fontSize="large" />
          )}
        </ActionButton>
        <ActionButton disabled={!currentTrack} onClick={onPlayNext}>
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
        >
          {audioVolume.isMuted ? (
            <VolumeOffIcon fontSize="large" />
          ) : (
            <VolumeUpOutlinedIcon fontSize="large" />
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
