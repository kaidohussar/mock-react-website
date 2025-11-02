import React from 'react'
import KpiCard from '../components/KpiCard'
import LineChartComponent from '../components/LineChartComponent'
import DataTable from '../components/DataTable'
import styles from './DashboardPage.module.scss'
import { useIntl, FormattedMessage } from 'react-intl'

const DashboardPage: React.FC = () => {
  const intl = useIntl()

  const totalVisitors = intl.formatMessage({
    id: 'Dashboard.Infoboxes.TotalVisitors',
  })
  const bounceRate = intl.formatMessage({
    id: 'Dashboard.Infoboxes.BounceRate',
  })
  const newSignups = intl.formatMessage({
    id: 'Dashboard.Infoboxes.NewSignups',
  })
  const conversionRates = intl.formatMessage({
    id: 'Dashboard.Infoboxes.ConversionRate',
  })

  // Mock Data for KPI Cards
  const kpiData = [
    {
      title: totalVisitors,
      value: '24,803',
      change: '+12.5%',
      // eslint-disable-next-line
      changeType: 'positive' as 'positive',
    },
    {
      title: bounceRate,
      value: '47.2%',
      change: '-2.1%',
      // eslint-disable-next-line
      changeType: 'negative' as 'negative',
    },
    {
      title: newSignups,
      value: '1,204',
      change: '+5.8%',
      // eslint-disable-next-line
      changeType: 'positive' as 'positive',
    },
    {
      title: conversionRates,
      value: '3.4%',
      change: '+0.7%',
      // eslint-disable-next-line
      changeType: 'positive' as 'positive',
    },
  ]

  const thisPeriodText = intl.formatMessage({
    id: 'Dashboard.TrendingVisitors.ThisPeriod',
  })
  const previousPeriodText = intl.formatMessage({
    id: 'Dashboard.TrendingVisitors.PreviousPeriod',
  })

  // Mock Data for Line Chart
  const chartData = [
    { name: 'Jan', [thisPeriodText]: 4000, [previousPeriodText]: 2400 },
    { name: 'Feb', [thisPeriodText]: 3000, [previousPeriodText]: 1398 },
    { name: 'Mar', [thisPeriodText]: 2000, [previousPeriodText]: 9800 },
    { name: 'Apr', [thisPeriodText]: 2780, [previousPeriodText]: 3908 },
    { name: 'May', [thisPeriodText]: 1890, [previousPeriodText]: 4800 },
    { name: 'Jun', [thisPeriodText]: 2390, [previousPeriodText]: 3800 },
    { name: 'Jul', [thisPeriodText]: 3490, [previousPeriodText]: 4300 },
    { name: 'Aug', [thisPeriodText]: 4000, [previousPeriodText]: 2400 },
    { name: 'Sep', [thisPeriodText]: 3000, [previousPeriodText]: 1398 },
    { name: 'Oct', [thisPeriodText]: 2000, [previousPeriodText]: 9800 },
    { name: 'Nov', [thisPeriodText]: 2780, [previousPeriodText]: 3908 },
    { name: 'Dec', [thisPeriodText]: 1890, [previousPeriodText]: 4800 },
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

  const title = intl.formatMessage({
    id: 'Dashboard.TrendingVisitors.Title',
  }, { days: 30 })

  return (
    <div className={styles.dashboardContent}>
      <h1 className={styles.welcomeTitle}>
        <FormattedMessage id="Dashboard.Greeting" values={{ name: 'Alex' }} />
      </h1>
      <h2 className={styles.roleDisplay}>
        <FormattedMessage id="Dashboard.RoleDisplay" />
      </h2>

      <h3>
        <FormattedMessage id="Sidebar.Test" />
      </h3>

      <div className={styles.kpiCardsContainer}>
        {kpiData.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>

      <LineChartComponent
        title={title}
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
