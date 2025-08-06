import React from 'react';
import styles from './Header.module.scss';
import { Search, Bell } from 'lucide-react';
import Input from './Input';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.searchBar}>
        <Search size={20} className={styles.searchIcon} />
        <Input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />
      </div>
      <div className={styles.userSection}>
        <Bell size={20} className={styles.icon} />
        <div className={styles.userProfile}>
          <div className={styles.avatar}>AD</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Alex Doe</span>
            <span className={styles.userRole}>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
