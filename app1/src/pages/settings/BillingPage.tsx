import React from 'react';
import { Sparkles } from 'lucide-react';
import styles from './BillingPage.module.scss';

const BillingPage: React.FC = () => {
  return (
    <div className={styles.billingPage}>
      <div className={styles.banner} role="status">
        <Sparkles size={18} className={styles.bannerIcon} />
        <span className={styles.bannerText}>
          You are on the <strong>Pro</strong> trial — 14 days remaining.
        </span>
        <a href="#upgrade" className={styles.bannerAction}>
          Upgrade
        </a>
      </div>

      <h2>Billing</h2>
      <p>Review your current plan, payment method, and invoices.</p>
    </div>
  );
};

export default BillingPage;
