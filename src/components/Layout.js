
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className='d-flex'>
      <Sidebar />
      <div className='flex-grow-1' style={{ marginLeft: '200px', padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
