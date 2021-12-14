import React, {
  useContext, createContext, ReactNode, useState, useMemo, useCallback,
} from 'react';
import { useApi } from '.';
import { MovieListItem, Movie } from '../types';
import { formatError } from '../helpers';

interface MovieProviderReturnValue {
  topMovieList: MovieListItem[],
  loading: boolean,
  error: string,
  movie: Movie,
  fetchMovieList: () => Promise<void>,
  fetchMovie: (id: number) => Promise<void>,
}

const MovieContext = createContext<MovieProviderReturnValue | null>(null);

interface Props {
  children: ReactNode
}

function MovieProvider({ children }: Props): JSX.Element {
  const { movieApi } = useApi();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [topMovieList, setTopMovieList] = useState<MovieListItem[]>([]);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    overview: '',
    poster: '',
    videos: [],
    releaseDate: '',
  });

  const fetchMovieList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await movieApi.get();
      setTopMovieList(res);
    } catch (err: unknown) {
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  }, [movieApi]);

  const fetchMovie = useCallback(async (id: number) => {
    try {
      setLoading(true);

      const res = await movieApi.find(id);
      setMovie(res);
    } catch (err: unknown) {
      setError(formatError(err));
    } finally {
      setLoading(false);
    }
  }, [movieApi]);

  const movieContextValue = useMemo(
    () => ({
      movie, fetchMovie, topMovieList, fetchMovieList, loading, error,
    }),
    [movie, fetchMovie, topMovieList, fetchMovieList, loading, error],
  );

  return (
    <MovieContext.Provider value={movieContextValue}>
      {children}
    </MovieContext.Provider>
  );
}

const useMovie = (): MovieProviderReturnValue => {
  const context = useContext(MovieContext);
  if (context === null) {
    throw new Error('useMovie must be used within MovieProvider');
  }
  return context;
};

export { MovieProvider, useMovie };
