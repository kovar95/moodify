"use client";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlined from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";
import { IconButton, Stack, styled } from "@mui/material";
import AddPlaylist from "./AddPlaylist";
import { emotions } from "./Emotions";
import Image from "next/image";
import logo from "../../logo.png";
import { useState } from "react";

const StyledMenuItem = styled(MenuItem)(
  ({ activeColor }: { activeColor?: string }) => ({
    marginTop: "2px",
    background: activeColor ?  `linear-gradient(90deg, ${activeColor}40 , transparent)` : "none",
    ":hover": {
      backgroundColor: "#1976d20a",
    },
    transition: "all .9s ease",
    paddingRight: 0,
  })
);

const ToggleArrow = styled(IconButton)(() => ({
  color: "gray",
  backgroundColor: "#1a1313",
  padding: "2px",
  position: "absolute",
  top: "50%",
  right: "5px",
}));

export const StyledIcon = styled(Stack)(() => ({
  alignItems: "center",
  justifyContent: "flex-start",
  fontSize: 14,
  flexDirection: "row",
  gap: 8,
  marginInline: 0.75,
  overflow: "scroll",
}));

function Sidebar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { playlists, setCurrentPlaylist, currentPlaylist } = usePlaylists();

  const findPlaylist = (playlistName: string) =>
    playlists.find((playlist) => playlist.name === playlistName);

  return (
    <Box
      position="fixed"
      width={openSidebar ? "265px" : "40px"}
      height="100vh"
      sx={{
        backgroundColor: "#1a1313fc",
        paddingTop: "15px",
        top: 0,
        left: 0,
        transition: "all .3s ease",
        zIndex: 2,
      }}
    >
      <Stack
        onClick={() => setOpenSidebar(!openSidebar)}
        sx={{ cursor: "pointer", paddingLeft: 0.5, marginBottom: 1, color: "white" }}
        direction="row"
        alignItems="center"
        gap={2}
      >
        <Image src={logo.src} alt="logo" width={30} height={30} />
        {openSidebar && <Box>Moodify</Box>}
      </Stack>
      {playlists.map(({ name, color, mood }) => (
        <StyledMenuItem
          key={name}
          onClick={() => setCurrentPlaylist(name)}
          sx={{
            borderLeft: `5px solid ${color}`,
            paddingLeft: openSidebar ? "" : "4px",
          }}
          activeColor={
            currentPlaylist === name ? findPlaylist(name)?.color : undefined
          }
        >
          <StyledIcon color={color}>
            {emotions.find((emotion) => emotion.face === mood)?.Icon}
            {openSidebar ? name : ""}
          </StyledIcon>
        </StyledMenuItem>
      ))}
      <AddPlaylist
        openedSidebar={openSidebar}
        onOpenSidebar={() => setOpenSidebar(true)}
      />
      <ToggleArrow onClick={() => setOpenSidebar(!openSidebar)}>
        {openSidebar ? (
          <KeyboardDoubleArrowLeftOutlined />
        ) : (
          <KeyboardDoubleArrowRightOutlinedIcon />
        )}
      </ToggleArrow>
    </Box>
  );
}
export default Sidebar;
