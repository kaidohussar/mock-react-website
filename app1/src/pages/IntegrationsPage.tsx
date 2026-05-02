import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings2, CheckCircle2, Circle } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import { integrations } from './integrationsData'
import styles from './IntegrationsPage.module.scss'

const IntegrationsPage: React.FC = () => {
  const navigate = useNavigate()

  const handleConfigure = (id: string) => {
    navigate(`/integrations/${id}/configure`)
  }

  return (
    <div className={styles.integrationsPage}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Integrations</h1>
          <p className={styles.subtitle}>
            Connect third-party services to extend your workspace.
          </p>
        </div>
      </div>

      <ul className={styles.integrationList}>
        {integrations.map((integration) => {
          const isConnected = integration.status === 'connected'
          return (
            <li key={integration.id}>
              <Card className={styles.integrationCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrap}>
                    <Settings2 size={20} />
                  </div>
                  <span
                    className={`${styles.status} ${
                      isConnected ? styles.statusConnected : styles.statusDisconnected
                    }`}
                  >
                    {isConnected ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <Circle size={14} />
                    )}
                    {isConnected ? 'Connected' : 'Not connected'}
                  </span>
                </div>
                <h3 className={styles.integrationName}>{integration.name}</h3>
                <p className={styles.category}>{integration.category}</p>
                <p className={styles.description}>{integration.description}</p>
                <div className={styles.cardActions}>
                  <Button
                    variant={isConnected ? 'outline' : 'primary'}
                    onClick={() => handleConfigure(integration.id)}
                  >
                    {isConnected ? 'Manage' : 'Configure'}
                  </Button>
                </div>
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default IntegrationsPage
