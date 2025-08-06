import React, { useState } from 'react'
import styles from './AnalyticsPage.module.scss'

interface AnalyticData {
  id: number
  metric: string
  value: number
}

const AnalyticsPage: React.FC = () => {
  const [analyticsData] = useState<AnalyticData[]>([
    { id: 1, metric: 'Page Views', value: 1200 },
    { id: 2, metric: 'Unique Visitors', value: 850 },
    { id: 3, metric: 'Bounce Rate', value: 45 },
    { id: 4, metric: 'Conversion Rate', value: 12 },
  ])

  return (
    <div className={styles.analyticsPage}>
      <h1>Analytics Page</h1>
      <p>This is the analytics content.</p>
      <div className={styles.dataSection}>
        <h2>Key Metrics</h2>
        <ul>
          {analyticsData.map((data) => (
            <li key={data.id}>
              {data.metric}: {data.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AnalyticsPage
