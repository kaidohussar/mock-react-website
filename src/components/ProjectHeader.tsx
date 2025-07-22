import React from 'react'
import styles from './ProjectHeader.module.scss'

const ProjectHeader: React.FC<{ projectName: string }> = ({ projectName }) => {
  return (
    <div className={styles.projectHeader}>
      <div className={styles.breadcrumbs}>
        My Projects / {projectName}
      </div>
      <div className={styles.actions}>
        <button>+ Invite</button>
        <div className={styles.settingsIcon}>⚙️</div>
      </div>
    </div>
  )
}

export default ProjectHeader
