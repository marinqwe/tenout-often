import React, { useEffect } from 'react';
import { Loader, Error, Card } from '../components';
import { useSearch, useTvShow } from '../common/providers';
import { useSearchTvShows } from '../common/hooks';

const TvShowList = (): JSX.Element => {
  const {
    loading, fetchTopTvShowList, topTvShowList, error,
  } = useTvShow();
  const { searchLoading, searchTvShowList, searchError } = useSearchTvShows();
  const { showSearchResults } = useSearch();

  const tvShows = showSearchResults ? searchTvShowList : topTvShowList;

  useEffect(() => {
    if (!showSearchResults) {
      fetchTopTvShowList();
    }
  }, [fetchTopTvShowList, showSearchResults]);

  if (loading || searchLoading) {
    return <Loader />;
  }

  if (error || searchError) {
    return <Error errorMessage={error || searchError} />;
  }
  const isSearchQueryEmpty = showSearchResults && searchTvShowList.length === 0;
  if (isSearchQueryEmpty) {
    return <p style={{ margin: '10px' }}>No tv shows found matching your search.</p>;
  }

  return (
    <>
      {tvShows.map(({
        id, name, cardImage, airDate, rating,
      }) => (
        <Card
          key={id}
          card={{
            id, name, image: cardImage, date: airDate, rating,
          }}
          navString="tv"
        />
      ))}
    </>
  );
};

export default TvShowList;
