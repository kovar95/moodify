import { RefObject, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const options = {
  waveColor: "gray",
  fillParent: true,
  responsive: true,
  autoplay: true,
  cursorWidth: 0,
  barHeight: 0.5,
  barGap: 3,
};

const useWavesurfer = (
  waveContainerRef: RefObject<HTMLElement>,
  audioSrc: string | undefined,
  progressColor?: string
) => {
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioVolume, setAudioVolume] = useState({ isMuted: false, value: 1 });

  useEffect(() => {
    if (waveContainerRef.current && audioSrc) {
      waveSurferRef.current = WaveSurfer.create({
        ...options,
        url: audioSrc,
        container: waveContainerRef.current,
        height: 100,
        progressColor: progressColor ?? "#1cc39f",
      });

      waveSurferRef.current.on("play", () => setIsPlaying(true));
      waveSurferRef.current.on("pause", () => setIsPlaying(false));

      waveSurferRef.current.setVolume(
        audioVolume.isMuted ? 0 : audioVolume.value
      );
    }
    return () => {
      waveSurferRef?.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc]);

  waveSurferRef?.current?.setVolume(
    audioVolume.isMuted ? 0 : audioVolume.value
  );

  return {
    handlePlayPause: () => waveSurferRef?.current?.playPause(),
    audioVolume,
    setAudioVolume,
    isPlaying,
  };
};

export default useWavesurfer;
