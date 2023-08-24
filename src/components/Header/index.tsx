"use client";

import { useState, KeyboardEvent, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import { InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useSearch } from "@/app/providers/SearchContextProvider";
import { usePlaylists } from "@/app/providers/PlaylistsContextProvider";
import { SearchInput, HeaderBar, SearchIcon, StyledToolbar } from "@/ui/Header";

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const { setSearchInput } = useSearch();
  const { setCurrentPlaylist } = usePlaylists();

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
    <HeaderBar>
      <StyledToolbar disableGutters>
        <Box width="100%" marginX="1em">
          <SearchInput
            value={searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            name="country"
            placeholder="Search for song"
            inputProps={{ maxLength: 100 }}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon edge="end" onClick={setSearch}>
                  <SearchRoundedIcon />
                </SearchIcon>
              </InputAdornment>
            }
          />
        </Box>
      </StyledToolbar>
    </HeaderBar>
  );
}
export default Header;
