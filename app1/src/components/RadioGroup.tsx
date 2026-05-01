import React from 'react'
import styles from './RadioGroup.module.scss'

export interface RadioOption {
  value: string
  label: string
  description?: string
}

interface RadioGroupProps {
  label?: string
  name: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => {
  return (
    <div className={styles.group}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.options}>
        {options.map((option) => {
          const id = `${name}-${option.value}`
          const isChecked = option.value === value
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={`${styles.option} ${isChecked ? styles.optionChecked : ''}`}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={() => onChange(option.value)}
                className={styles.input}
              />
              <span className={styles.indicator} aria-hidden="true" />
              <span className={styles.text}>
                <span className={styles.optionLabel}>{option.label}</span>
                {option.description && (
                  <span className={styles.optionDescription}>
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default RadioGroup
