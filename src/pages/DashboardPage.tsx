import React from 'react'
import Header from '../components/Header'
import ProjectsSection from '../components/ProjectsSection'
import RecentActivitySidebar from '../components/RecentActivitySidebar'
import Container from '../components/Container'
import styles from './DashboardPage.module.scss'

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <Header userName="User" />
      <Container>
        <div className={styles.mainContent}>
          <ProjectsSection />
          <RecentActivitySidebar />
        </div>
      </Container>
    </div>
  )
}

export default DashboardPage