"use client";

import { useState, KeyboardEvent, useEffect, ChangeEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  InputAdornment,
  OutlinedInput,
  IconButton,
  styled,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import axios from "axios";
import { useSearch } from "@/app/providers/SearchContextProvider";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";

const StyledInput = styled(OutlinedInput)(
  ({ activeColor }: { activeColor?: string }) => ({
    color: "#1b1515",
    outline: "1px solid #fff",
    width: "100%",
    "& input": {
      padding: "10px",
    },
    "& fieldset.MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    borderRadius: "4px",
    "&.Mui-focused fieldset": {
      borderColor: `#fff !important`,
    },
  })
);

const SearchIcon = styled(IconButton)(() => ({
  backgroundColor: "#494949 !important",
  borderRadius: "8px",
  color: "white",
  padding: "5px",
  marginRight: "-8px",
  boxShadow: " 0px 3px 6px rgba(0, 0, 0, 0.2)",
}));

function ResponsiveAppBar() {
  const [searchValue, setSearchValue] = useState("");
  const { setSearchInput } = useSearch();
  const { setCurrentPlaylist, currentColor } = usePlaylists();

  const setSearch = () => {
    setSearchInput(searchValue);
    setCurrentPlaylist(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch();
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "transparent",
        paddingInline: 0.5,
        boxShadow: "none",
        zIndex: 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          justifyContent: "flex-start",
          paddingLeft: "42px",
          paddingRight: "8px",
        }}
      >
        <Box width="100%" marginX="1em">
          <StyledInput
            value={searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            name="country"
            placeholder="Search for song"
            inputProps={{ maxLength: 100 }}
            activeColor={currentColor}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon edge="end" onClick={setSearch}>
                  <SearchRoundedIcon />
                </SearchIcon>
              </InputAdornment>
            }
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
