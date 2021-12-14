import React, {
  useContext, createContext, ReactNode, useState, useMemo, useCallback,
} from 'react';
import { useApi } from '.';
import { formatError } from '../helpers';
import { TvShow, TvShowListItem } from '../types';

interface TvShowProviderReturnValue {
  topTvShowList: TvShowListItem[],
  tvShow: TvShow,
  loading: boolean,
  error: string,
  fetchTopTvShowList: () => Promise<void>,
  fetchTvShow: (id: number) => Promise<void>
}

const TvShowContext = createContext<TvShowProviderReturnValue | null>(null);

interface Props {
  children: ReactNode
}

function TvShowProvider({ children }: Props): JSX.Element {
  const { tvShowApi } = useApi();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [topTvShowList, setTopTvShowList] = useState<TvShowListItem[]>([]);
  const [tvShow, setTvShow] = useState<TvShow>({
    name: '',
    overview: '',
    poster: '',
    videos: [],
    airDate: '',
  });

  const fetchTopTvShowList = useCallback(async () => {
    try {
      const res = await tvShowApi.get();
      if (res) {
        setTopTvShowList(res);
      }
    } catch (err: unknown) {
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  }, [tvShowApi]);

  const fetchTvShow = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const res = await tvShowApi.find(id);
      if (res) {
        setTvShow(res);
      }
    } catch (err: unknown) {
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  }, [tvShowApi]);

  const tvShowContextValue = useMemo(
    () => ({
      tvShow, fetchTvShow, topTvShowList, fetchTopTvShowList, loading, error,
    }),
    [tvShow, fetchTvShow, topTvShowList, fetchTopTvShowList, loading, error],

  );

  return (
    <TvShowContext.Provider value={tvShowContextValue}>
      {children}
    </TvShowContext.Provider>
  );
}

const useTvShow = (): TvShowProviderReturnValue => {
  const context = useContext(TvShowContext);
  if (context === null) {
    throw new Error('useTvShow must be used within the TvShowProvider');
  }
  return context;
};

export { TvShowProvider, useTvShow };
