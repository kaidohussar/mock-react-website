import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { LayoutDashboard, BarChart2, FileText, Puzzle, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        Insightify
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li className={getLinkClass('/dashboard')}>
            <Link to="/dashboard">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={getLinkClass('/analytics')}>
            <Link to="/analytics">
              <BarChart2 size={20} />
              <span>Analytics</span>
            </Link>
          </li>
          <li className={getLinkClass('/reports')}>
            <Link to="/reports">
              <FileText size={20} />
              <span>Reports</span>
            </Link>
          </li>
          <li className={getLinkClass('/integrations')}>
            <Link to="/integrations">
              <Puzzle size={20} />
              <span>Integrations</span>
            </Link>
          </li>
          <li className={getLinkClass('/settings')}>
            <Link to="/settings">
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;