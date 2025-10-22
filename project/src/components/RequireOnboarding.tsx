// components/RequireOnboarding.tsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useOnboarding } from '../contexts/OnboardingContext'

const RequireOnboarding: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isCompleted } = useOnboarding()
  const location = useLocation()

  if (!isCompleted) {
    return <Navigate to="/onboarding" replace state={{ from: location }} />
  }

  return <>{children}</>
}

export default RequireOnboarding
