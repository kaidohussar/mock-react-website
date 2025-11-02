import React, { useContext } from 'react';
import styles from './Header.module.scss';
import { Search, Bell } from 'lucide-react';
import Input from './Input';
import { LocaleContext } from '../App';

const Header: React.FC = () => {
  const { locale, setLocale } = useContext(LocaleContext);

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
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
          style={{ marginRight: '1rem', padding: '0.25rem 0.5rem' }}
        >
          <option value="en">EN</option>
          <option value="et">ET</option>
        </select>
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
