import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavigationBar.module.scss'

const NavigationBar: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}><Link to="/">ConnectSphere</Link></div>
      <ul className={styles.navLinks}>
        <li><Link to="/">Features</Link></li>
        <li><Link to="/">Pricing</Link></li>
        <li><Link to="/">About Us</Link></li>
        <li><Link to="/dashboard">Log In</Link></li>
      </ul>
    </nav>
  )
}

export default NavigationBar
