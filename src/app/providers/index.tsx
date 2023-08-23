"use client";

import { ReactNode } from "react";
import SearchContextProvider from "./SearchContextProvider";
import PlaylistsContextProvider from "./PlaylistsContextProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SearchContextProvider>
      <PlaylistsContextProvider>{children}</PlaylistsContextProvider>
    </SearchContextProvider>
  );
}
