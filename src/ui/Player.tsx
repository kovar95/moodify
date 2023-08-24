import { IconButton, Slider, Stack, styled } from "@mui/material";

export const Wrapper = styled(Stack)(({ theme }) => ({
  width: "100vw",
  height: "65px",
  flexDirection: "row",
  backgroundColor: theme.palette.primary.dark,
  alignItems: "center",
  justifyContent: "space-between",
  paddingInline: 3,
  position: "fixed",
  right: 0,
  bottom: 0,
  zIndex: 3,
  color: theme.palette.text.primary,
}));

export const ActionButton = styled(IconButton)(({ theme }) => ({
  width: "65px",
  height: "65px",
  color: "inherit",
  [theme.breakpoints.down("sm")]: {
    width: "35px",
    height: "35px",
    "& svg": {
      width: "0.75em",
      height: "0.75em",
    },
  },
}));

export const VolumeSlider = styled(Slider)(() => ({
  position: "absolute",
  top: "-105px",
  right: "12px",
  height: "100px",
  color: "inherit",
}));

export const TrackInfo = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  paddingInline: 6,
  gap: 6,
  fontSize: 10,
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  "& img": {
    borderRadius: 50,
  },
}));
