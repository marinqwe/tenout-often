import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

interface SearchContextReturnValue {
  searchString: string;
  setSearchString: Dispatch<SetStateAction<string>>;
  showSearchResults: boolean;
}

const SearchContext = React.createContext<SearchContextReturnValue | null>(
  null,
);

interface Props {
  children: JSX.Element;
}

export function SearchProvider({ children }: Props): JSX.Element {
  const [searchString, setSearchString] = useState('');

  const searchProviderValue = useMemo(
    () => ({ searchString, setSearchString, showSearchResults: searchString.length >= 3 }),
    [searchString, setSearchString],
  );

  return (
    <SearchContext.Provider value={searchProviderValue}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = (): SearchContextReturnValue => {
  const context = useContext(SearchContext);

  if (context == null) {
    throw new Error('useSearch must be used within SearchProvider');
  }

  return context;
};
