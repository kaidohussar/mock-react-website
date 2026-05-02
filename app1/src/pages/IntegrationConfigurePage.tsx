import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'
import RadioGroup from '../components/RadioGroup'
import { findIntegration } from './integrationsData'
import styles from './IntegrationConfigurePage.module.scss'

const environmentOptions = [
  {
    value: 'production',
    label: 'Production',
    description: 'Apply this integration to your live workspace.',
  },
  {
    value: 'staging',
    label: 'Staging',
    description: 'Test the integration in a non-production environment.',
  },
]

const IntegrationConfigurePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const integration = findIntegration(id)

  const [apiKey, setApiKey] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [environment, setEnvironment] = useState('production')
  const [syncEvents, setSyncEvents] = useState(true)
  const [saved, setSaved] = useState(false)

  if (!integration) {
    return (
      <div className={styles.configurePage}>
        <Button variant="outline" onClick={() => navigate('/integrations')}>
          <ArrowLeft size={16} style={{ marginRight: 6 }} />
          Back to integrations
        </Button>
        <Card className={styles.notFoundCard}>
          <h2>Integration not found</h2>
          <p>We couldn't find an integration with the id "{id}".</p>
        </Card>
      </div>
    )
  }

  const isValid = apiKey.trim() !== ''

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setSaved(true)
  }

  const handleBack = () => {
    navigate('/integrations')
  }

  return (
    <div className={styles.configurePage}>
      <button
        type="button"
        className={styles.backLink}
        onClick={handleBack}
      >
        <ArrowLeft size={16} />
        Back to integrations
      </button>

      <div className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>Configure integration</p>
          <h1 className={styles.title}>{integration.name}</h1>
          <p className={styles.subtitle}>{integration.description}</p>
        </div>
      </div>

      {saved && (
        <Card className={styles.successCard}>
          <CheckCircle2 size={20} />
          <div>
            <strong>Settings saved.</strong>
            <p>{integration.name} is configured for the {environment} environment.</p>
          </div>
        </Card>
      )}

      <Card className={styles.formCard}>
        <form onSubmit={handleSave} className={styles.form}>
          <h2 className={styles.sectionTitle}>Credentials</h2>
          <Input
            label="API key"
            placeholder="sk_live_..."
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value)
              setSaved(false)
            }}
            required
          />
          <Input
            label="Webhook URL (optional)"
            placeholder="https://hooks.example.com/incoming"
            value={webhookUrl}
            onChange={(e) => {
              setWebhookUrl(e.target.value)
              setSaved(false)
            }}
          />

          <h2 className={styles.sectionTitle}>Environment</h2>
          <RadioGroup
            name="environment"
            options={environmentOptions}
            value={environment}
            onChange={(value) => {
              setEnvironment(value)
              setSaved(false)
            }}
          />

          <h2 className={styles.sectionTitle}>Options</h2>
          <Checkbox
            label="Sync events from this integration in real time"
            checked={syncEvents}
            onChange={(value) => {
              setSyncEvents(value)
              setSaved(false)
            }}
          />

          <div className={styles.formActions}>
            <Button type="button" variant="outline" onClick={handleBack}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Save configuration
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default IntegrationConfigurePage
