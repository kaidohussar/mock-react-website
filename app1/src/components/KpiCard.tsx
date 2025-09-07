import React from 'react';
import styles from './KpiCard.module.scss';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  changeType,
}) => {
  return (
    <div className={styles.kpiCard}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
      <p className={`${styles.change} ${styles[changeType]}`}>{change}</p>
    </div>
  );
};

export default KpiCard;
