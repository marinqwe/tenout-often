import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovie } from '../common/providers';
import { ContentDetails } from '../components';

const MovieDetails = (): JSX.Element => {
  const { id } = useParams();
  const {
    loading, fetchMovie, movie: {
      title, videos, overview, poster, releaseDate,
    },
  } = useMovie();

  let movieId = 0;
  if (id) {
    movieId = parseInt(id, 10);
  }

  useEffect(() => {
    fetchMovie(movieId);
  }, [fetchMovie, movieId]);

  return (
    <ContentDetails
      name={title}
      videoList={videos}
      poster={poster}
      overview={overview}
      loading={loading}
      date={releaseDate}
    />
  );
};

export default MovieDetails;
