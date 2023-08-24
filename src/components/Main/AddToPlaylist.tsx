import { FC } from "react";
import { IconButton, Modal, Stack } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import { Track } from "@/types/Track";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";
import { ModalContent, Playlist, CloseButton } from "@/ui/Main";

type Props = {
  onClose: () => void;
  open: boolean;
  track: Track;
};

const AddToPlaylist: FC<Props> = ({ onClose, open, track }) => {
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
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-add-to-playlist"
    >
      <ModalContent>
        <Stack gap={2}>
          <Stack id="modal-modal-title" sx={{ fontSize: { xs: 12, sm: "" } }}>
            Add &quot;{title}&quot; by {author} to playlist:
          </Stack>
          <Stack gap={1}>
            {playlists.map((playlist) => (
              <Playlist key={playlist.name} plcolor={playlist.color}>
                <Stack>{playlist.name}</Stack>
                <Stack>
                  <IconButton
                    size="small"
                    sx={{ padding: 0 }}
                    onClick={() => handlePlaylistAction(playlist.name)}
                  >
                    {isInPlaylist(playlist.name) ? (
                      <RemoveCircleOutlinedIcon color="error" />
                    ) : (
                      <AddCircleOutlinedIcon color="primary" />
                    )}
                  </IconButton>
                </Stack>
              </Playlist>
            ))}
          </Stack>
        </Stack>
        <CloseButton onClose={onClose} />
      </ModalContent>
    </Modal>
  );
};

export default AddToPlaylist;
