import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './SettingsPage.module.scss';

const SettingsPage: React.FC = () => {
  return (
    <div className={styles.settingsPage}>
      <h1>Settings</h1>
      <nav className={styles.subnav}>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive ? `${styles.subnavLink} ${styles.active}` : styles.subnavLink
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="billing"
          className={({ isActive }) =>
            isActive ? `${styles.subnavLink} ${styles.active}` : styles.subnavLink
          }
        >
          Billing
        </NavLink>
      </nav>
      <div className={styles.subpage}>
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;
