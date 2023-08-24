import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Stack, styled } from "@mui/material";

export const StyledMenuItem = styled(MenuItem)<{
  clr?: string;
  opened: number;
}>(({ clr, opened }) => ({
  marginTop: "2px",
  background: clr ? `linear-gradient(90deg, ${clr}40 , transparent)` : "none",
  ":hover": {
    backgroundColor: "#1976d20a",
  },
  transition: "all .9s ease",
  paddingRight: 0,
  borderLeft: `5px solid ${clr}`,
  paddingLeft: opened ? 16 : 8,
}));

export const ToggleArrow = styled(IconButton)(() => ({
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

export const SidebarContainer = styled(Box)<{ opened: number }>(
  ({ opened, theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    paddingTop: "15px",
    top: 0,
    left: 0,
    transition: "all .3s ease",
    zIndex: 2,
    position: "fixed",
    height: "100vh",
    width: opened ? "265px" : "40px",
  })
);

export const Logo = styled(Stack)(() => ({
  cursor: "pointer",
  paddingLeft: 6,
  marginBottom: 1,
  color: "white",
  flexDirection: "row",
  alignItems: "center",
}));
