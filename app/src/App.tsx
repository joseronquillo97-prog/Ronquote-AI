import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AppShell from './components/AppShell'
import DashboardPage from './pages/DashboardPage'
import UploadPage from './pages/UploadPage'
import ProcessingPage from './pages/ProcessingPage'
import ReviewPage from './pages/ReviewPage'
import PricingPage from './pages/PricingPage'

export default function App() {
  return (
    <Routes>
      {/* Public marketing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Authenticated app — everything lives inside the sidebar shell */}
      <Route path="/app" element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="rfq/new" element={<UploadPage />} />
        <Route path="rfq/:id/processing" element={<ProcessingPage />} />
        <Route path="rfq/:id/review" element={<ReviewPage />} />
        <Route path="rfq/:id/pricing" element={<PricingPage />} />
      </Route>

      {/* Anything unknown → landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
