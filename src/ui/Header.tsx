import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { OutlinedInput, IconButton, styled } from "@mui/material";

export const SearchInput = styled(OutlinedInput)(({ theme }) => ({
  color: "#1b1515",
  outline: `1px solid ${theme.palette.common.white}`,
  width: "100%",
  "& input": {
    padding: "10px",
  },
  "& fieldset.MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.common.white,
  },
  borderRadius: "4px",
  "&.Mui-focused fieldset": {
    borderColor: `${theme.palette.common.white} !important`,
  },
}));

export const HeaderBar = styled(AppBar)(() => ({
  position: "fixed",
  backgroundColor: "transparent",
  paddingInline: 0.5,
  boxShadow: "none",
  zIndex: 1,
}));

export const StyledToolbar = styled(Toolbar)(() => ({
  justifyContent: "flex-start",
  paddingLeft: "42px",
  paddingRight: "8px",
}));

export const SearchIcon = styled(IconButton)(({ theme }) => ({
  backgroundColor: `${theme.palette.secondary.main} !important`,
  borderRadius: "8px",
  color: theme.palette.common.white,
  padding: "5px",
  marginRight: "-8px",
  boxShadow: `0px 3px 6px ${theme.palette.common.black}30`,
}));
