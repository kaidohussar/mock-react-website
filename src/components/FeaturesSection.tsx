import React from 'react'
import styles from './FeaturesSection.module.scss'

const FeaturesSection: React.FC = () => {
  return (
    <div className={styles.features}>
      <h2>Everything You Need to Propel Projects Forward</h2>
      <div className={styles.featureGrid}>
        <div className={styles.featureCard}>
          <div className={styles.icon}>✓</div>
          <h3>Unified Task Management</h3>
          <p>Assign tasks, set deadlines, and track progress from start to finish. Our intuitive boards give you a bird's-eye view of your entire project.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.icon}>💬</div>
          <h3>Seamless Collaboration</h3>
          <p>Communicate in real-time with team channels, share files securely, and keep all project-related conversations in one place. No more lost emails.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.icon}>📈</div>
          <h3>Insightful Reporting</h3>
          <p>Generate beautiful, easy-to-understand reports on team productivity and project milestones. Make data-driven decisions with confidence.</p>
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
