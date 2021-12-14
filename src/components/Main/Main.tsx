import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Search } from '..';

export const Main = (): JSX.Element => (
  <>
    <Header />
    <Search />
    <div className="main">
      <Outlet />
    </div>
  </>
);
