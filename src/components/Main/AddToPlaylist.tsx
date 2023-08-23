import { FC } from "react";
import { Box, Button, IconButton, Modal, Stack, styled } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Track } from "@/types/Track";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";

const ModalContent = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-45%, -50%)",
  backgroundColor: "#1a1313fc",
  color: "#d3d3d3",
  //   border: "1px solid #D9D9D9",
  padding: "30px 30px",
  borderRadius: "8px",
  width: "auto",
  maxWidth: 375,
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

type Props = {
  onClose?: () => void;
  onContinue?: () => void;
  open: boolean;
  track: Track;
};

const AddToPlaylist: FC<Props> = ({ onClose, onContinue, open, track }) => {
  const {
    title,
    artist: { name: author },
    id,
  } = track;

  const { playlists, addTrackToPlaylist, removeTrackFromPlaylist } =
    usePlaylists();

  const isInPlaylist = (playlistName: string) =>
    playlists
      .find((playlist) => playlist.name === playlistName)
      ?.items?.some((item) => item.id === id);

  const handlePlaylistAction = (playlistName: string) =>
    isInPlaylist(playlistName)
      ? removeTrackFromPlaylist(track, playlistName)
      : addTrackToPlaylist(track, playlistName);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title">
      <ModalContent>
        <Stack gap={2}>
          <Stack
            id="modal-modal-title"
            sx={{ fontSize: { xs: 12, sm: "" } }}
          >
            Add &quot;{title}&quot; by {author} to playlist:
          </Stack>
          <Stack gap={1}>
            {playlists.map((playlist) => (
              <Stack
                key={playlist.name}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                padding="4px 8px 4px 12px"
                color="black"
                sx={{
                  background: `linear-gradient(89deg, ${playlist.color}, transparent)`,
                  borderRadius: "25px 0 0 25px",
                  fontSize: { xs: 12, sm: "" }
                }}
              >
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
              </Stack>
            ))}
          </Stack>
        </Stack>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={onClose}
        >
          <CloseIcon color="warning" />
        </IconButton>
        {/* <Button onClick={onClose}> */}
      </ModalContent>
    </Modal>
  );
};

export default AddToPlaylist;
