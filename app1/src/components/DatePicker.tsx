import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './DatePicker.module.scss'

interface DatePickerProps {
  label?: string
  id?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const pad = (n: number) => n.toString().padStart(2, '0')

const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

const parseIsoDate = (value: string): Date | null => {
  if (!value) return null
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return null
  const date = new Date(y, m - 1, d)
  return Number.isNaN(date.getTime()) ? null : date
}

const formatDisplay = (date: Date) =>
  `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

const buildCalendarGrid = (year: number, month: number) => {
  const firstOfMonth = new Date(year, month, 1)
  // Monday-first: getDay() returns 0 for Sunday, so shift.
  const startWeekday = (firstOfMonth.getDay() + 6) % 7
  const start = new Date(year, month, 1 - startWeekday)
  const days: Date[] = []
  for (let i = 0; i < 42; i++) {
    days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
  }
  return days
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  id,
  value,
  onChange,
  required,
  placeholder = 'Select a date',
}) => {
  const inputId =
    id || (label ? `dp-${label.toLowerCase().replace(/\s/g, '-')}` : undefined)

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedDate = useMemo(() => parseIsoDate(value), [value])
  const today = useMemo(() => new Date(), [])

  const initial = selectedDate ?? today
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())

  useEffect(() => {
    if (isOpen) {
      const base = selectedDate ?? today
      setViewYear(base.getFullYear())
      setViewMonth(base.getMonth())
    }
  }, [isOpen, selectedDate, today])

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen])

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const handleSelectDay = (day: Date) => {
    onChange(toIsoDate(day))
    setIsOpen(false)
  }

  const days = useMemo(
    () => buildCalendarGrid(viewYear, viewMonth),
    [viewYear, viewMonth],
  )

  const displayValue = selectedDate ? formatDisplay(selectedDate) : ''

  return (
    <div className={styles.group} ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <button
        id={inputId}
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-required={required}
      >
        <Calendar className={styles.icon} size={16} />
        <span className={displayValue ? styles.value : styles.placeholder}>
          {displayValue || placeholder}
        </span>
      </button>

      {isOpen && (
        <div className={styles.calendar} role="dialog" aria-label="Choose date">
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.navButton}
              onClick={goToPrevMonth}
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <span className={styles.monthLabel}>
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              className={styles.navButton}
              onClick={goToNextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className={styles.weekdays}>
            {WEEKDAYS.map((d) => (
              <span key={d} className={styles.weekday}>
                {d}
              </span>
            ))}
          </div>

          <div className={styles.grid}>
            {days.map((day) => {
              const isCurrentMonth = day.getMonth() === viewMonth
              const isSelected = selectedDate
                ? isSameDay(day, selectedDate)
                : false
              const isToday = isSameDay(day, today)

              const classes = [styles.day]
              if (!isCurrentMonth) classes.push(styles.dayMuted)
              if (isSelected) classes.push(styles.daySelected)
              if (isToday && !isSelected) classes.push(styles.dayToday)

              return (
                <button
                  key={toIsoDate(day)}
                  type="button"
                  className={classes.join(' ')}
                  onClick={() => handleSelectDay(day)}
                  aria-pressed={isSelected}
                >
                  {day.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
