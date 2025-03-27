

import { Outlet } from 'react-router-dom';
import React from 'react';
import SideBar from '@/components/Sidebar/Sidebar'; // Import Sidebar component
// import styles from './LabRoot.module.css'; // Import Lab Root CSS module

export default function Root() {
  return (
    <>
      <div id="sidebar" >
      {/* <div id="sidebar" className={styles.sidebar}> */}
        {/* <h1>Use React Router</h1> */}
        {/* <SearchBar /> */}
        <SideBar />
      </div>

      <div id="detail" style={{ overflow: "scroll" }}>
        <Outlet />
      </div>
    </>
  );
}
