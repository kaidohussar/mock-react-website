import React, { useState } from 'react'
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
import { ContentProvider } from '@contentstorage/react' // Import global styles
// import ENContent from './content/json/EN.json'
// import ETContent from './content/json/ET.json'
//
// const isDevEnv = import.meta.env.DEV

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  return (
    <ContentProvider
      contentKey="108541025900791613826/52697ca2-e4c3-4f92-97bb-698bcb917dfc"
      loadingFallback={<div>LOADING CONTENT</div>}
      languageCodes={['EN', 'ET']}
      contentMode="headless"
      withPendingChanges
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
    </ContentProvider>
  )
}

export default App
