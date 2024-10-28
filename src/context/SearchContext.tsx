import React, {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
} from "react";

export interface QueryItem {
  id: number;
  title: string;
  name: string;
  surname: string;
  age: number;
  city: string;
}

export interface SearchContextProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  updateSearchQuery: (newQuery: string) => void;
  query: string;
  data: QueryItem[];
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState<string>("");
  const data: QueryItem[] = [
    {
      id: 1,
      title: "Hello World",
      name: "John",
      surname: "Smith",
      age: 25,
      city: "New York",
    },
    {
      id: 2,
      title: "React is Great",
      name: "Jane",
      surname: "Sullingham",
      age: 30,
      city: "Los Angeles",
    },
    {
      id: 3,
      title: "TypeScript for the Win",
      name: "Alice",
      surname: "Simpsons",
      age: 28,
      city: "Chicago",
    },
  ];

  const updateSearchQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <SearchContext.Provider
      value={{ query, setQuery, data, updateSearchQuery }}
    >
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
