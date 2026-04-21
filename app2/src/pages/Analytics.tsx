import React, { useMemo, useState } from 'react';
import './Pages.css';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronsUpDown, ChevronUp, PieChart } from 'lucide-react';

type SortColumn = 'page' | 'views' | 'uniqueVisitors';
type SortDirection = 'asc' | 'desc';

const Analytics: React.FC = () => {
  const { t } = useTranslation();
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const metrics = [
    {
      labelKey: 'analytics.metrics.pageViews',
      value: '245,678',
      change: '+12.5%',
      trend: 'up',
    },
    {
      labelKey: 'analytics.metrics.uniqueVisitors',
      value: '89,432',
      change: '+8.3%',
      trend: 'up',
    },
    {
      labelKey: 'analytics.metrics.bounceRate',
      value: '34.2%',
      change: '-3.1%',
      trend: 'down',
    },
    {
      labelKey: 'analytics.metrics.avgSession',
      value: '4m 32s',
      change: '+15.2%',
      trend: 'up',
    },
  ];

  const topPages = [
    { page: '/home', views: 45678, uniqueVisitors: 23456 },
    { page: '/products', views: 34567, uniqueVisitors: 18901 },
    { page: '/about', views: 23456, uniqueVisitors: 12345 },
    { page: '/contact', views: 12345, uniqueVisitors: 8901 },
    { page: '/blog', views: 9876, uniqueVisitors: 5678 },
  ];

  const sortedPages = useMemo(() => {
    if (sortColumn === null) return topPages;
    const copy = [...topPages];
    copy.sort((a, b) => {
      const av = a[sortColumn];
      const bv = b[sortColumn];
      let cmp: number;
      if (typeof av === 'number' && typeof bv === 'number') {
        cmp = av - bv;
      } else {
        cmp = String(av).localeCompare(String(bv));
      }
      return sortDirection === 'asc' ? cmp : -cmp;
    });
    return copy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortColumn, sortDirection]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn !== column) {
      setSortColumn(column);
      setSortDirection('asc');
      return;
    }
    if (sortDirection === 'asc') {
      setSortDirection('desc');
      return;
    }
    setSortColumn(null);
    setSortDirection('asc');
  };

  const ariaSortFor = (column: SortColumn): 'ascending' | 'descending' | 'none' => {
    if (sortColumn !== column) return 'none';
    return sortDirection === 'asc' ? 'ascending' : 'descending';
  };

  const sortIconFor = (column: SortColumn) => {
    if (sortColumn !== column) return <ChevronsUpDown size={14} className="sort-icon" />;
    return sortDirection === 'asc' ? (
      <ChevronUp size={14} className="sort-icon" />
    ) : (
      <ChevronDown size={14} className="sort-icon" />
    );
  };

  const ariaLabelFor = (column: SortColumn, labelKey: string) => {
    const state = ariaSortFor(column);
    const stateKey =
      state === 'ascending'
        ? 'analytics.table.sortAscending'
        : state === 'descending'
          ? 'analytics.table.sortDescending'
          : 'analytics.table.sortNone';
    return `${t(labelKey)}: ${t(stateKey)}`;
  };

  const renderSortableHeader = (column: SortColumn, labelKey: string) => (
    <th
      className="sortable"
      aria-sort={ariaSortFor(column)}
      scope="col"
    >
      <button
        type="button"
        onClick={() => handleSort(column)}
        aria-label={ariaLabelFor(column, labelKey)}
      >
        <span>{t(labelKey)}</span>
        {sortIconFor(column)}
      </button>
    </th>
  );

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('analytics.title')}</h1>
        <p className="page-subtitle">{t('analytics.subtitle')}</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-label">{t(metric.labelKey)}</div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-change ${metric.trend}`}>
              {metric.trend === 'up' ? '↗' : '↘'} {metric.change}
            </div>
          </div>
        ))}
      </div>

      <div className="content-section">
        <h2>{t('analytics.topPages')}</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                {renderSortableHeader('page', 'analytics.table.page')}
                {renderSortableHeader('views', 'analytics.table.views')}
                {renderSortableHeader('uniqueVisitors', 'analytics.table.uniqueVisitors')}
              </tr>
            </thead>
            <tbody>
              {sortedPages.map((page, index) => (
                <tr key={index}>
                  <td>{page.page}</td>
                  <td>{page.views.toLocaleString()}</td>
                  <td>{page.uniqueVisitors.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('analytics.trafficSources')}</h2>
        <div className="chart-placeholder">
          <div className="placeholder-content">
            <span className="placeholder-icon">
              <PieChart size={48} />
            </span>
            <p>{t('analytics.chartPlaceholder')}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Analytics;
