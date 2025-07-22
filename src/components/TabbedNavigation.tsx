import React, { useState } from 'react'
import styles from './TabbedNavigation.module.scss'

interface TabbedNavigationProps {
  onTabChange: (tab: string) => void;
}

const TabbedNavigation: React.FC<TabbedNavigationProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('tasks')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    onTabChange(tab)
  }

  return (
    <nav className={styles.tabNav}>
      <button
        className={`${styles.tabButton} ${activeTab === 'tasks' ? styles.active : ''}`}
        onClick={() => handleTabClick('tasks')}
      >
        Tasks
      </button>
      <button
        className={`${styles.tabButton} ${activeTab === 'files' ? styles.active : ''}`}
        onClick={() => handleTabClick('files')}
      >
        Files
      </button>
      <button
        className={`${styles.tabButton} ${activeTab === 'discussion' ? styles.active : ''}`}
        onClick={() => handleTabClick('discussion')}
      >
        Discussion
      </button>
    </nav>
  )
}

export default TabbedNavigation
