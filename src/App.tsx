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
import './styles/main.scss' // Import global styles

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  return (
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
  )
}

export default App
