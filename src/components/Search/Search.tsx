import React from 'react';
import { useSearch } from '../../common/providers';

export const Search = (): JSX.Element => {
  const { searchString, setSearchString } = useSearch();

  return (
    <div className="search-wrapper">
      <input
        onChange={(e) => setSearchString(e.target.value)}
        value={searchString}
        className="search"
        placeholder="Search"
      />
    </div>
  );
};
