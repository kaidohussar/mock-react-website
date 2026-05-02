import React, { useState } from 'react'
import { Plus, CalendarDays, MapPin, Users, Tag } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import Modal from '../components/Modal'
import DatePicker from '../components/DatePicker'
import Dropdown from '../components/Dropdown'
import RadioGroup from '../components/RadioGroup'
import Checkbox from '../components/Checkbox'
import styles from './EventsPage.module.scss'

interface EventSubmission {
  id: string
  name: string
  date: string
  category: string
  visibility: string
  notifyTeam: boolean
  requireRsvp: boolean
  submittedAt: string
}

const categoryOptions = [
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'meetup', label: 'Meetup' },
  { value: 'webinar', label: 'Webinar' },
  { value: 'launch', label: 'Product Launch' },
]

const visibilityOptions = [
  {
    value: 'public',
    label: 'Public',
    description: 'Anyone with the link can view this event.',
  },
  {
    value: 'team',
    label: 'Team only',
    description: 'Visible to members of your workspace.',
  },
  {
    value: 'private',
    label: 'Private',
    description: 'Only invited attendees can see it.',
  },
]

const categoryLabel = (value: string) =>
  categoryOptions.find((c) => c.value === value)?.label ?? value

const visibilityLabel = (value: string) =>
  visibilityOptions.find((v) => v.value === value)?.label ?? value

const EventsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submissions, setSubmissions] = useState<EventSubmission[]>([])

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [visibility, setVisibility] = useState('team')
  const [notifyTeam, setNotifyTeam] = useState(true)
  const [requireRsvp, setRequireRsvp] = useState(false)

  const resetForm = () => {
    setName('')
    setDate('')
    setCategory('')
    setVisibility('team')
    setNotifyTeam(true)
    setRequireRsvp(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const isValid = name.trim() !== '' && date !== '' && category !== ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    const submission: EventSubmission = {
      id:
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `evt-${Date.now()}`,
      name: name.trim(),
      date,
      category,
      visibility,
      notifyTeam,
      requireRsvp,
      submittedAt: new Date().toISOString(),
    }

    setSubmissions((prev) => [submission, ...prev])
    closeModal()
  }

  return (
    <div className={styles.eventsPage}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Events</h1>
          <p className={styles.subtitle}>
            Schedule and track upcoming team events.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={16} style={{ marginRight: 6 }} />
          New event
        </Button>
      </div>

      <Card className={styles.summaryCard}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Total submissions</span>
          <span className={styles.summaryValue} data-testid="submission-count">
            {submissions.length}
          </span>
        </div>
      </Card>

      <h2 className={styles.sectionTitle}>Submitted events</h2>

      {submissions.length === 0 ? (
        <Card className={styles.emptyState}>
          <p>No events submitted yet. Click "New event" to add one.</p>
        </Card>
      ) : (
        <ul className={styles.submissionList}>
          {submissions.map((s) => (
            <li key={s.id}>
              <Card className={styles.submissionCard}>
                <div className={styles.submissionHeader}>
                  <h3 className={styles.submissionName}>{s.name}</h3>
                  <span
                    className={`${styles.badge} ${styles[`badge_${s.visibility}`]}`}
                  >
                    {visibilityLabel(s.visibility)}
                  </span>
                </div>
                <dl className={styles.submissionDetails}>
                  <div>
                    <dt>
                      <CalendarDays size={14} /> Date
                    </dt>
                    <dd>{s.date}</dd>
                  </div>
                  <div>
                    <dt>
                      <Tag size={14} /> Category
                    </dt>
                    <dd>{categoryLabel(s.category)}</dd>
                  </div>
                  <div>
                    <dt>
                      <Users size={14} /> Notify team
                    </dt>
                    <dd>{s.notifyTeam ? 'Yes' : 'No'}</dd>
                  </div>
                  <div>
                    <dt>
                      <MapPin size={14} /> RSVP required
                    </dt>
                    <dd>{s.requireRsvp ? 'Yes' : 'No'}</dd>
                  </div>
                </dl>
                <p className={styles.submittedAt}>
                  Submitted {new Date(s.submittedAt).toLocaleString()}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create a new event"
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Event name"
            placeholder="Q2 Customer Workshop"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <DatePicker
            label="Event date"
            value={date}
            onChange={setDate}
            required
          />

          <Dropdown
            label="Category"
            options={categoryOptions}
            value={category}
            onChange={setCategory}
            placeholder="Choose a category"
          />

          <RadioGroup
            label="Visibility"
            name="visibility"
            options={visibilityOptions}
            value={visibility}
            onChange={setVisibility}
          />

          <div className={styles.checkboxStack}>
            <Checkbox
              label="Notify team via email"
              checked={notifyTeam}
              onChange={setNotifyTeam}
            />
            <Checkbox
              label="Require RSVP from attendees"
              checked={requireRsvp}
              onChange={setRequireRsvp}
            />
          </div>

          <div className={styles.formActions}>
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Create event
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default EventsPage
