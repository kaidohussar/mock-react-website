import React, { useState } from 'react';
import styles from './ReportsPage.module.scss';
import Dropdown, { type DropdownOption } from '../components/Dropdown';

const reportTypeOptions: DropdownOption[] = [
  { value: 'all', label: 'All reports' },
  { value: 'sales', label: 'Sales' },
  { value: 'traffic', label: 'Traffic' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'customers', label: 'Customers' },
];

const reportDescriptions: Record<string, string> = {
  all: 'Showing all available reports.',
  sales: 'Showing sales reports for the selected period.',
  traffic: 'Showing traffic reports across all channels.',
  revenue: 'Showing revenue reports broken down by product.',
  customers: 'Showing customer activity reports.',
};

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState('all');

  return (
    <div className={styles.reportsPage}>
      <h1>Reports Page</h1>
      <div className={styles.filter}>
        <Dropdown
          label="Report type"
          value={reportType}
          options={reportTypeOptions}
          onChange={setReportType}
        />
      </div>
      <p>{reportDescriptions[reportType]}</p>
    </div>
  );
};

export default ReportsPage;
