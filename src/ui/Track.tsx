import { Box, IconButton, Stack, styled } from "@mui/material";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";

export const StyledTrack = styled(Stack)<{ current: number }>(
  ({ theme, current }) => ({
    height: "50px",
    maxWidth: "600px",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10px 5px",
    borderRadius: "50px 5px 5px 50px",
    backgroundColor: current
      ? theme.palette.common.white
      : theme.palette.secondary.light,
    position: "relative",
    width: "49%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "&:hover": {
      opacity: 0.8,
    },
  })
);

export const StyledDetails = styled(Box)(() => ({
  width: "40px",
  height: "40px",
  "& img": {
    borderRadius: "50px",
  },
  cursor: "pointer",
}));

export const PlayButton = styled(PlayCircleFilledOutlinedIcon)(({ theme }) => ({
  backgroundColor: "#8e8e8e",
  position: "absolute",
  borderRadius: "50px",
  left: "5px",
  top: "5px",
  width: "40px",
  height: "40px",
  opacity: 0,
  color: theme.palette.common.white,
  "&:hover": {
    opacity: 0.7,
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "& svg": {
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
}));
