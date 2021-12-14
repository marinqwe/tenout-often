import {
  useState, useRef, useEffect,
} from 'react';
import debounce from 'lodash.debounce';
import { DebouncedFunc } from 'lodash';
import { TvShowListItem } from '../types';
import { useApi, useSearch } from '../providers';
import { formatError } from '../helpers';

interface SearchTvShows {
  searchLoading: boolean,
  searchError: string | null,
  searchTvShowList: TvShowListItem[],
  cancelSearch: () => void,
}

export const useSearchTvShows = (): SearchTvShows => {
  const { tvShowApi } = useApi();
  const { searchString, showSearchResults } = useSearch();
  const [searchTvShowList, setSearchTvShowList] = useState<TvShowListItem[]>([]);
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
          const res = await tvShowApi.search(searchString);
          setSearchTvShowList(res);
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
  }, [searchString, showSearchResults, tvShowApi]);

  return {
    searchLoading,
    searchError,
    searchTvShowList,
    cancelSearch,
  };
};
