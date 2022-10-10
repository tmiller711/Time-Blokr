import React from 'react';
import SideNav from './SideNav';
import { Outlet } from 'react-router';

export default () => {
  return (
    <>
      <SideNav />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};