import React from 'react';
import styles from './Dropdown.module.scss';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string;
  id?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  id,
  value,
  options,
  onChange,
  className,
  disabled,
}) => {
  const selectId =
    id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);

  return (
    <div className={`${styles.dropdownGroup} ${className || ''}`}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={styles.select}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
