import React, { useContext, useMemo } from 'react';
import { MovieApi, TvShowApi } from '../api';
import { BASE_API_URL } from '../constants';

interface ApiProviderReturnValue {
  movieApi: MovieApi,
  tvShowApi: TvShowApi
}

const ApiContext = React.createContext<ApiProviderReturnValue | null>(null);

interface Props {
  children: JSX.Element
}

export function ApiProvider({ children }: Props): JSX.Element {
  const apiContextValue = useMemo(() => ({
    movieApi: new MovieApi(BASE_API_URL),
    tvShowApi: new TvShowApi(BASE_API_URL),
  }), []);

  return <ApiContext.Provider value={apiContextValue}>{children}</ApiContext.Provider>;
}

export const useApi = (): ApiProviderReturnValue => {
  const context = useContext(ApiContext);

  if (context == null) {
    throw new Error('useApi must be used within ApiProvider');
  }

  return context;
};
