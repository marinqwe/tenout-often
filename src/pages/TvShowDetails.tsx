import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTvShow } from '../common/providers';
import { ContentDetails } from '../components';

const TvShowDetails = (): JSX.Element => {
  const { id } = useParams();
  const {
    loading, fetchTvShow, tvShow: {
      name, videos, overview, poster, airDate,
    },
  } = useTvShow();

  let tvShowId = 0;
  if (id) {
    tvShowId = parseInt(id, 10);
  }

  useEffect(() => {
    fetchTvShow(tvShowId);
  }, [fetchTvShow, tvShowId]);

  return (
    <ContentDetails
      name={name}
      videoList={videos}
      poster={poster}
      overview={overview}
      loading={loading}
      date={airDate}
    />
  );
};

export default TvShowDetails;
