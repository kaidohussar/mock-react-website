import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  return (
    <div className={styles.layoutContainer}>
      <Sidebar />
      <div className={styles.mainContentArea}>
        <Header />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
