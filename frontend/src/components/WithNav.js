import React from 'react';
import SideNav from './SideNav';
import { Outlet } from 'react-router';

export default ({ getCurTime }) => {
  return (
    <>
      <SideNav getCurTime={getCurTime} />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};