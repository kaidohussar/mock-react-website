export type IntegrationStatus = 'connected' | 'disconnected'

export interface Integration {
  id: string
  name: string
  description: string
  category: string
  status: IntegrationStatus
}

export const integrations: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send notifications and alerts to your Slack channels.',
    category: 'Communication',
    status: 'disconnected',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Sync repositories and track development activity.',
    category: 'Development',
    status: 'connected',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Track payment events and revenue analytics.',
    category: 'Payments',
    status: 'disconnected',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Sync contacts and marketing campaigns.',
    category: 'CRM',
    status: 'disconnected',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automate workflows across thousands of apps.',
    category: 'Automation',
    status: 'connected',
  },
  {
    id: 'segment',
    name: 'Segment',
    description: 'Forward customer data to your analytics tools.',
    category: 'Analytics',
    status: 'disconnected',
  },
]

export const findIntegration = (id: string | undefined): Integration | undefined =>
  integrations.find((i) => i.id === id)
