import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextProps {
  query: string;
  updateSearchQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>("");

  const updateSearchQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <SearchContext.Provider value={{ query, updateSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
