"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlined from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";
import AddPlaylist from "./AddPlaylist";
import { emotions } from "../../ui/Emotions";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import {
  Logo,
  SidebarContainer,
  StyledIcon,
  StyledMenuItem,
  ToggleArrow,
} from "@/ui/Sidebar";

function Sidebar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { playlists, setCurrentPlaylist, currentPlaylist } = usePlaylists();

  const findPlaylist = (playlistName: string) =>
    playlists.find((playlist) => playlist.name === playlistName);

  return (
    <SidebarContainer opened={openSidebar ? 1 : 0}>
      <Logo onClick={() => setOpenSidebar(!openSidebar)} gap={2}>
        <Image src={logo.src} alt="logo" width={30} height={30} />
        {openSidebar && <Box>Moodify</Box>}
      </Logo>
      {playlists.map(({ name, color, mood }) => (
        <StyledMenuItem
          key={name}
          onClick={() => setCurrentPlaylist(name)}
          clr={currentPlaylist === name ? findPlaylist(name)?.color : undefined}
          opened={openSidebar ? 1 : 0}
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
    </SidebarContainer>
  );
}
export default Sidebar;
