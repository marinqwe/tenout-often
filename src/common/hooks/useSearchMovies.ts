import {
  useState, useRef, useEffect,
} from 'react';
import debounce from 'lodash.debounce';
import { DebouncedFunc } from 'lodash';
import { MovieListItem } from '../types';
import { useApi, useSearch } from '../providers';
import { formatError } from '../helpers';

interface SearchMovies {
  searchLoading: boolean,
  searchError: string | null,
  searchMovieList: MovieListItem[],
  cancelSearch: () => void,
}

export const useSearchMovies = (): SearchMovies => {
  const { movieApi } = useApi();
  const { searchString, showSearchResults } = useSearch();
  const [searchMovieList, setSearchMovieList] = useState<MovieListItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const debouncedSearchReference = useRef<DebouncedFunc<() => Promise<void>> | null>(null);

  const cancelSearch = (): void => {
    debouncedSearchReference.current?.cancel();
    debouncedSearchReference.current = null;
  };

  useEffect(() => {
    cancelSearch();
    if (showSearchResults) {
      setSearchLoading(true);
      debouncedSearchReference.current = debounce(async () => {
        try {
          setSearchError(null);
          const res = await movieApi.search(searchString);
          setSearchMovieList(res);
        } catch (err: unknown) {
          setSearchError(formatError(err));
        } finally {
          setSearchLoading(false);
        }
      }, 1000);

      debouncedSearchReference.current();
    } else {
      setSearchLoading(false);
      cancelSearch();
    }

    return () => {
      cancelSearch();
    };
  }, [searchString, showSearchResults, movieApi]);

  return {
    searchLoading,
    searchError,
    searchMovieList,
    cancelSearch,
  };
};
