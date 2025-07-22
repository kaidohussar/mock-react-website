import React from 'react'
import styles from './RecentActivitySidebar.module.scss'

const RecentActivitySidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <h3>Recent Activity</h3>
      <ul>
        <li>
          <span className={styles.avatar}>S</span> <strong>Sarah</strong> completed the task "Design new logo mockups" in the <strong>Brand Refresh</strong> project.
        </li>
        <li>
          <span className={styles.avatar}>Y</span> <strong>You</strong> were added to the <strong>Website Relaunch</strong> project.
        </li>
        <li>
          <span className={styles.avatar}>J</span> <strong>John</strong> commented on "Bug Fixes" in <strong>Mobile App Development</strong>.
        </li>
        <li>
          <span className={styles.avatar}>A</span> <strong>Alex</strong> uploaded "Q3 Report.pdf" to <strong>Q3 Marketing Campaign</strong>.
        </li>
      </ul>
    </aside>
  )
}

export default RecentActivitySidebar
