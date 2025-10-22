// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { OnboardingProvider } from './contexts/OnboardingContext'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard'
import Home from './pages/Home'
import Legion from './pages/legion'
import DemandZoneAnalyzer from './pages/demand-zone-analyzer/DemandZoneAnalyzer'
import Profile from './pages/Profile'
import AuthPage from './components/AuthPage'
import OnboardingFlow from './components/onboarding/OnboardingFlow'
import RequireOnboarding from './components/RequireOnboarding' // new

function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage />} />

            {/* Onboarding is protected but bypasses the "must be completed" guard */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <OnboardingFlow />
                </ProtectedRoute>
              }
            />

            {/* All other protected routes require onboarding to be complete */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <RequireOnboarding>
                    <Dashboard />
                  </RequireOnboarding>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <RequireOnboarding>
                    <Profile />
                  </RequireOnboarding>
                </ProtectedRoute>
              }
            />
            <Route
              path="/legion"
              element={
                <ProtectedRoute>
                  <RequireOnboarding>
                    <Legion />
                  </RequireOnboarding>
                </ProtectedRoute>
              }
            />
            <Route
              path="/demand-zone-analyzer"
              element={
                <ProtectedRoute>
                  <RequireOnboarding>
                    <DemandZoneAnalyzer />
                  </RequireOnboarding>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </OnboardingProvider>
    </AuthProvider>
  )
}

export default App
