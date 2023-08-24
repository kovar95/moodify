"use client";

import { useState, ChangeEvent, MouseEvent, FC } from "react";
import { useTheme } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";
import { colorPalettes } from "@/constants";
import { emotions } from "../../ui/Emotions";
import {
  AddButton,
  StyledBox,
  StyledColorBox,
  StyledColorField,
  StyledInput,
  StyledMenuItem,
} from "@/ui/Playlist";
import { StyledIcon } from "@/ui/Sidebar";

type Playlist = {
  name: string;
  mood: string;
  color: string;
};

type Props = {
  openedSidebar: boolean;
  onOpenSidebar: () => void;
};

const AddPlaylist: FC<Props> = ({ openedSidebar, onOpenSidebar }) => {
  const theme = useTheme();
  const { createPlaylist } = usePlaylists();

  const [newPlaylist, setNewPlaylist] = useState<Playlist>({
    name: "",
    color: theme.palette.info.main,
    mood: "happy",
  });

  const [openInput, setOpenInput] = useState(false);
  const [openColours, setOpenColours] = useState(false);
  const [openMood, setOpenMood] = useState(false);

  const onChangePlaylistName = (e: ChangeEvent<HTMLInputElement>) =>
    setNewPlaylist({ ...newPlaylist, name: e.currentTarget.value });

  const onChangePlaylistColor = (
    e: MouseEvent<HTMLDivElement>,
    color: string
  ) => {
    e.stopPropagation();
    setNewPlaylist({ ...newPlaylist, color });
    setOpenColours(false);
  };

  const onChangePlaylistMood = (
    e: MouseEvent<HTMLDivElement>,
    mood: string
  ) => {
    e.stopPropagation();
    setNewPlaylist({ ...newPlaylist, mood });
    setOpenMood(false);
  };

  const onAddPlaylist = () => {
    createPlaylist(newPlaylist);
    setNewPlaylist({
      name: "",
      color: theme.palette.info.main,
      mood: "happy",
    });
    setOpenInput(false);
  };

  return (
    <>
      <StyledMenuItem
        key="add-playlist"
        onClick={() => {
          if (!openedSidebar) {
            onOpenSidebar();
          }
          setOpenInput(!openInput);
        }}
        opened={openedSidebar ? 1 : 0}
      >
        <StyledIcon>
          <PlaylistAddIcon />
          {openedSidebar ? "Add playlist" : ""}
        </StyledIcon>
      </StyledMenuItem>
      {openInput && openedSidebar && (
        <StyledMenuItem key="add-playlist-input" opened={openedSidebar ? 1 : 0}>
          <StyledInput
            onChange={onChangePlaylistName}
            value={newPlaylist.name}
          />
          <StyledColorField
            palette={newPlaylist.color}
            onClick={() => setOpenColours(!openColours)}
          >
            <StyledColorBox show={openColours ? 1 : 0}>
              {colorPalettes.map((color) => (
                <StyledBox
                  key={color}
                  palette={color}
                  onClick={(e) => onChangePlaylistColor(e, color)}
                />
              ))}
            </StyledColorBox>
          </StyledColorField>
          <StyledColorField onClick={() => setOpenMood(!openMood)}>
            {
              emotions.find((emotion) => emotion.face === newPlaylist.mood)
                ?.Icon
            }
            <StyledColorBox show={openMood ? 1 : 0}>
              {emotions.map((emotion) => (
                <StyledBox
                  key={emotion.face}
                  onClick={(e) => onChangePlaylistMood(e, emotion.face)}
                >
                  {emotion.Icon}
                </StyledBox>
              ))}
            </StyledColorBox>
          </StyledColorField>
          <AddButton onClick={onAddPlaylist} />
        </StyledMenuItem>
      )}
    </>
  );
};
export default AddPlaylist;
