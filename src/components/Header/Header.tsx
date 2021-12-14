import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => (
  <nav className="header">
    <NavLink className={({ isActive }) => (isActive ? 'link link--active' : 'link')} to="/">Tv Shows</NavLink>
    <NavLink className={({ isActive }) => (isActive ? 'link link--active' : 'link')} to="/movies">Movies</NavLink>
  </nav>
);
