import React from 'react'
import { Check } from 'lucide-react'
import styles from './Checkbox.module.scss'

interface CheckboxProps {
  id?: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange }) => {
  const inputId = id || `cb-${label.toLowerCase().replace(/\s/g, '-')}`

  return (
    <label htmlFor={inputId} className={styles.wrapper}>
      <input
        id={inputId}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={`${styles.box} ${checked ? styles.boxChecked : ''}`}
        aria-hidden="true"
      >
        {checked && <Check size={14} strokeWidth={3} />}
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  )
}

export default Checkbox
