import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, id, className, ...props }) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);

  return (
    <div className={`${styles.inputGroup} ${className || ''}`}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <input id={inputId} className={styles.input} {...props} />
    </div>
  );
};

export default Input;
