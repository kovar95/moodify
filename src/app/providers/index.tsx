"use client";

import { ReactNode } from "react";
import SearchContextProvider from "./SearchContextProvider";
import PlaylistsContextProvider from "./PlaylistsContextProvider";
import { ThemeProvider } from "@mui/material";
import theme from "@/ui/theme";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <SearchContextProvider>
        <PlaylistsContextProvider>{children}</PlaylistsContextProvider>
      </SearchContextProvider>
    </ThemeProvider>
  );
}
