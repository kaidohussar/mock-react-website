import React from 'react'
import KpiCard from '../components/KpiCard'
import LineChartComponent from '../components/LineChartComponent'
import DataTable from '../components/DataTable'
import styles from './DashboardPage.module.scss'
import { useGetText } from '@contentstorage/react'

const DashboardPage: React.FC = () => {
  // Mock Data for KPI Cards
  const kpiData = [
    {
      title: 'Total Visitors',
      value: '24,803',
      change: '+12.5%',
      changeType: 'positive' as const,
    },
    {
      title: 'Bounce Rate',
      value: '47.2%',
      change: '-2.1%',
      changeType: 'negative' as const,
    },
    {
      title: 'New Signups',
      value: '1,204',
      change: '+5.8%',
      changeType: 'positive' as const,
    },
    {
      title: 'Conversion Rate',
      value: '3.4%',
      change: '+0.7%',
      changeType: 'positive' as const,
    },
  ]

  const thisPeriodText = useGetText({
    contentId: 'Dashboard.TrendingVisitors.ThisPeriod',
  })
  const previousPeriodText = useGetText({
    contentId: 'Dashboard.TrendingVisitors.PreviousPeriod',
  })

  // Mock Data for Line Chart
  const chartData = [
    { name: 'Jan', 'This Period': 4000, 'Previous Period': 2400 },
    { name: 'Feb', 'This Period': 3000, 'Previous Period': 1398 },
    { name: 'Mar', 'This Period': 2000, 'Previous Period': 9800 },
    { name: 'Apr', 'This Period': 2780, 'Previous Period': 3908 },
    { name: 'May', 'This Period': 1890, 'Previous Period': 4800 },
    { name: 'Jun', 'This Period': 2390, 'Previous Period': 3800 },
    { name: 'Jul', 'This Period': 3490, 'Previous Period': 4300 },
    { name: 'Aug', 'This Period': 4000, 'Previous Period': 2400 },
    { name: 'Sep', 'This Period': 3000, 'Previous Period': 1398 },
    { name: 'Oct', 'This Period': 2000, 'Previous Period': 9800 },
    { name: 'Nov', 'This Period': 2780, 'Previous Period': 3908 },
    { name: 'Dec', 'This Period': 1890, 'Previous Period': 4800 },
  ]

  // Mock Data for Data Table
  const tableColumns = [
    { key: 'source', header: 'Source' },
    { key: 'visitors', header: 'Visitors' },
    { key: 'conversionRate', header: 'Conversion Rate' },
  ]

  const tableData = [
    { source: 'Google', visitors: '15,000', conversionRate: '4.5%' },
    { source: 'Twitter', visitors: '8,200', conversionRate: '2.1%' },
    { source: 'Product Hunt', visitors: '5,100', conversionRate: '3.8%' },
    { source: 'Direct', visitors: '3,500', conversionRate: '5.2%' },
    { source: 'Facebook', visitors: '2,800', conversionRate: '1.9%' },
    { source: 'LinkedIn', visitors: '1,900', conversionRate: '3.0%' },
  ]

  return (
    <div className={styles.dashboardContent}>
      <h1 className={styles.welcomeTitle}>Welcome Back, Alex!</h1>

      <div className={styles.kpiCardsContainer}>
        {kpiData.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>

      <LineChartComponent
        title="Visitor Trends (Last 30 Days)"
        data={chartData}
        dataKey1={thisPeriodText}
        dataKey2={previousPeriodText}
      />

      <DataTable
        title="Top Referral Sources"
        columns={tableColumns}
        data={tableData}
      />
    </div>
  )
}

export default DashboardPage
