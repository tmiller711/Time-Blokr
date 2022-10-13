import React from 'react';
import { Outlet } from 'react-router';

export default () => {
  return (
    <>
      <div className="registration">
        <Outlet />
      </div>
    </>
  );
}