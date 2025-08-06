import React from 'react';
import styles from './DataTable.module.scss';

interface Column {
  key: string;
  header: string;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ title, columns, data }) => {
  return (
    <div className={styles.dataTableContainer}>
      <h3 className={styles.dataTableTitle}>{title}</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
