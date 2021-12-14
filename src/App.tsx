import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from './components';
import {
  MovieDetails, NotFoundPage, TvShowDetails, MovieList, TvShowList,
} from './pages';
import './App.css';

const App: React.FC = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<TvShowList />} />
        <Route path="movies" element={<MovieList />} />
      </Route>
      <Route path="tv/:id" element={<TvShowDetails />} />
      <Route path="movies/:id" element={<MovieDetails />} />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  </div>
);

export default App;
