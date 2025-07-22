import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import { ContentProvider } from '@contentstorage/react'

function App() {
  return (
    <ContentProvider
      contentKey="108541025900791613826/2076807b-036d-4e7a-a5ea-24190920bde6"
      loadingFallback={<div>LOADING CONTENT</div>}
      languageCodes={['EN', 'FR']}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </Router>
    </ContentProvider>
  )
}

export default App
