import { useState, createContext, useContext, useMemo, ReactNode } from "react";

type SearchContextType = {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
};

export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);

type Props = {
  children: ReactNode;
};

export default function SearchContextProvider({
  children,
}: Props): React.ReactElement {
  const [searchInput, setSearchInput] = useState<string>("eminem");

  const contextValues = useMemo(
    () => ({ searchInput, setSearchInput }),
    [searchInput]
  );

  return (
    <SearchContext.Provider value={contextValues}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
