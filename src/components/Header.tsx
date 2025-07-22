import React from 'react'
import styles from './Header.module.scss'

const Header: React.FC<{ userName: string }> = ({ userName }) => {
  return (
    <header className={styles.header}>
      <div className={styles.welcomeMessage}>
        Good morning, {userName}.
      </div>
      <div className={styles.actions}>
        <input type="search" placeholder="Search projects, tasks, or files..." />
        <button>+ New Project</button>
        <div className={styles.profileAvatar}>U</div>
      </div>
    </header>
  )
}

export default Header
