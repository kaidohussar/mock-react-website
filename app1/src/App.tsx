import React, { useState, createContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AnalyticsPage from './pages/AnalyticsPage'
import ReportsPage from './pages/ReportsPage'
import IntegrationsPage from './pages/IntegrationsPage'
import EventsPage from './pages/EventsPage'
import SettingsPage from './pages/SettingsPage'
import CustomersPage from './pages/CustomersPage'
import Layout from './components/Layout'
import './styles/main.scss'
import { ContentstorageIntlProvider } from '@contentstorage/react-intl-plugin'
import enMessages from './content/json/EN.json'
import etMessages from './content/json/ET.json'
import { useAuth } from './hooks/useAuth'

// eslint-disable-next-line react-refresh/only-export-components
export const LocaleContext = createContext<{
  locale: string
  setLocale: (locale: string) => void
}>({
  locale: 'en',
  setLocale: () => {},
})

const App: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const [locale, setLocale] = useState('en')

  const messages = locale === 'et' ? etMessages : enMessages

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <ContentstorageIntlProvider
        locale={locale}
        messages={messages}
        debug={false}
      >
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              {isAuthenticated ? (
                <Route path="/" element={<Layout />}>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="integrations" element={<IntegrationsPage />} />
                  <Route path="customers" element={<CustomersPage />} />
                  <Route path="events" element={<EventsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route
                    path="*"
                    element={<Navigate to="dashboard" replace />}
                  />
                </Route>
              ) : (
                <Route path="*" element={<Navigate to="/login" replace />} />
              )}
            </Routes>
          </div>
        </Router>
      </ContentstorageIntlProvider>
    </LocaleContext.Provider>
  )
}

export default App
