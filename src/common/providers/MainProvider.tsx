import React from 'react';
import {
  ApiProvider, MovieProvider, TvShowProvider, SearchProvider,
} from '.';

interface Props {
  children: JSX.Element
}

export function MainProvider({ children }: Props): JSX.Element {
  return (
    <ApiProvider>
      <SearchProvider>
        <MovieProvider>
          <TvShowProvider>
            {children}
          </TvShowProvider>
        </MovieProvider>
      </SearchProvider>
    </ApiProvider>
  );
}
