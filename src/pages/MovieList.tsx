import React, { useEffect } from 'react';
import { Loader, Error, Card } from '../components';
import { useMovie, useSearch } from '../common/providers';
import { useSearchMovies } from '../common/hooks/useSearchMovies';

const MovieList = (): JSX.Element => {
  const {
    loading, fetchMovieList, topMovieList, error,
  } = useMovie();
  const { searchLoading, searchMovieList, searchError } = useSearchMovies();
  const { showSearchResults } = useSearch();

  const movies = showSearchResults ? searchMovieList : topMovieList;

  useEffect(() => {
    if (!showSearchResults) {
      fetchMovieList();
    }
  }, [fetchMovieList, showSearchResults]);

  if (loading || searchLoading) {
    return <Loader />;
  }

  if (error || searchError) {
    return <Error errorMessage={error || searchError} />;
  }

  const isSearchQueryEmpty = showSearchResults && searchMovieList.length === 0;
  if (isSearchQueryEmpty) {
    return <p style={{ margin: '10px' }}>No movies found matching your search.</p>;
  }

  return (
    <>
      {movies.map(({
        id, title, cardImage, rating, releaseDate,
      }) => (
        <Card
          key={id}
          card={{
            id, image: cardImage, rating, date: releaseDate, name: title,
          }}
          navString="movies"
        />
      ))}
    </>
  );
};

export default MovieList;
