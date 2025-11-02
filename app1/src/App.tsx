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
import SettingsPage from './pages/SettingsPage'
import Layout from './components/Layout'
import './styles/main.scss'
import { ContentstorageIntlProvider } from '@contentstorage/react-intl-plugin'
import enMessages from './messages/en.json'
import etMessages from './messages/et.json'

export const LocaleContext = createContext<{
  locale: string
  setLocale: (locale: string) => void
}>({
  locale: 'en',
  setLocale: () => {},
})

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [locale, setLocale] = useState('en')

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  const messages = {
    en: enMessages,
    et: etMessages,
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <ContentstorageIntlProvider
        locale={locale}
        messages={messages[locale as keyof typeof messages]}
        debug={false}
      >
        <Router>
          <div className="App">
            <Routes>
              <Route
                path="/login"
                element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
              />
              {isLoggedIn ? (
                <Route path="/" element={<Layout />}>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="integrations" element={<IntegrationsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
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
