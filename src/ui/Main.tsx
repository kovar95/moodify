import { FC } from "react";
import { Box, IconButton, Stack, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const CurrentTrack = styled(Stack)<{ show: number }>(
  ({ show, theme }) => ({
    padding: "20px",
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "15px",
    position: "relative",
    flexDirection: "row",
    width: "100%",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: show ? "flex" : "none",
    },
    "& img": {
      borderRadius: "15px",
    },
  })
);

export const Tracks = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  maxHeight: "75vh",
  overflow: "scroll",
  flexWrap: "wrap",
  width: "100%",
  justifyContent: "space-around",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
  },
  "& img": {
    borderRadius: "50px",
  },
}));

export const Container = styled(Stack)(({ theme }) => ({
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const MainContainer = styled("main")<{ mainclr: string }>(
  ({ mainclr, theme }) => ({
    padding: " 4rem 1rem 4rem 3rem",
    height: "100vh",
    background: `linear-gradient(${mainclr}, ${theme.palette.common.black})`,
  })
);

export const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-45%, -50%)",
  backgroundColor: theme.palette.primary.dark,
  color: "#d3d3d3",
  padding: "30px 30px",
  borderRadius: "8px",
  width: "auto",
  maxWidth: 375,
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export const Playlist = styled(Stack)<{ plcolor: string }>(
  ({ plcolor, theme }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 8px 4px 12px",
    color: "black",
    background: `linear-gradient(89deg, ${plcolor}, transparent)`,
    borderRadius: "25px 0 0 25px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  })
);

export const CloseButton: FC<{ onClose: () => void }> = ({ onClose }) => (
  <IconButton sx={{ position: "absolute", top: 0, right: 0 }} onClick={onClose}>
    <CloseIcon color="warning" />
  </IconButton>
);
