"use client";

import { useState, ChangeEvent, MouseEvent, FC } from "react";
import { Box, MenuItem } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddIcon from "@mui/icons-material/Add";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import { colorPalettes } from "@/constants";
import { emotions } from "./Emotions";
import { StyledIcon } from ".";

const StyledMenuItem = styled(MenuItem)(() => ({
  ":hover": {
    backgroundColor: "#1976d20a",
  },
  transition: "all .9s ease",
  paddingRight: 0,
}));

const StyledInput = styled(TextField)(() => ({
  "& input": {
    color: "#bdbdbd",
    fontSize: "14px",
    padding: "7px",
    outline: "1px #ffffff36 solid",
    width: "125px",
    borderRadius: "4px",
  },
  "& fieldset.MuiOutlinedInput-notchedOutline": {
    borderColor: "#71fab5 !important",
  },
}));

const StyledColorField = styled(Box)(() => ({
  borderRadius: "50px",
  width: "25px",
  height: "25px",
  marginLeft: "6px",
  position: "relative",
}));

const StyledColorBox = styled(Box)(() => ({
  backgroundColor: "#8080803b",
  borderRadius: "50px",
  padding: "24px 2px 0",
  position: "absolute",
  top: 0,
  width: "100%",
}));

const StyledBox = styled(Box)(() => ({
  width: "18px",
  height: "18px",
  margin: "6px auto",
  borderRadius: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: "0.8",
  "&:hover": {
    opacity: "1",
  },
}));

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
  const { createPlaylist } = usePlaylists();

  const [newPlaylist, setNewPlaylist] = useState<Playlist>({
    name: "",
    color: "#71fab5",
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
      color: "#71fab5",
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
        sx={{
          color: "#646464",
          paddingLeft: openedSidebar ? "22px" : "12px",
        }}
      >
        <StyledIcon>
          <PlaylistAddIcon
            sx={{
              color: "#646464",
            }}
          />
          {openedSidebar ? "Add playlist" : ""}
        </StyledIcon>
      </StyledMenuItem>
      {openInput && openedSidebar && (
        <StyledMenuItem
          key="add-playlist-input"
          sx={{ backgroundColor: "#2d2727" }}
        >
          <StyledInput
            onChange={onChangePlaylistName}
            value={newPlaylist.name}
          />
          <StyledColorField
            sx={{
              backgroundColor: newPlaylist.color,
            }}
            onClick={() => setOpenColours(!openColours)}
          >
            <StyledColorBox
              sx={{
                visibility: openColours ? "visible" : "hidden",
                height: openColours ? "auto" : "0",
              }}
            >
              {colorPalettes.map((color) => (
                <StyledBox
                  key={color}
                  sx={{
                    backgroundColor: color,
                  }}
                  onClick={(e) => onChangePlaylistColor(e, color)}
                />
              ))}
            </StyledColorBox>
          </StyledColorField>
          <StyledColorField
            sx={{
              backgroundColor: "#fff",
            }}
            onClick={() => setOpenMood(!openMood)}
          >
            {
              emotions.find((emotion) => emotion.face === newPlaylist.mood)
                ?.Icon
            }
            <StyledColorBox
              sx={{
                visibility: openMood ? "visible" : "hidden",
                height: openMood ? "auto" : "0",
              }}
            >
              {emotions.map((emotion) => (
                <StyledBox
                  key={emotion.face}
                  sx={{
                    backgroundColor: "#fff",
                  }}
                  onClick={(e) => onChangePlaylistMood(e, emotion.face)}
                >
                  {emotion.Icon}
                </StyledBox>
              ))}
            </StyledColorBox>
          </StyledColorField>
          <AddIcon
            sx={{ marginLeft: "8px", color: "#71fab5" }}
            onClick={onAddPlaylist}
          />
        </StyledMenuItem>
      )}
    </>
  );
};
export default AddPlaylist;
