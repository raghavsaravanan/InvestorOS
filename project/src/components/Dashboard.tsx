import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { OnboardingProvider, useOnboarding } from '../contexts/OnboardingContext'
import OnboardingFlow from './onboarding/OnboardingFlow'
import Navbar from './Navbar'

const DashboardContent: React.FC = () => {
  const { isCompleted } = useOnboarding()

  // Show onboarding for new users
  if (!isCompleted) {
    return <OnboardingFlow />
  }

  // Show dashboard for completed users
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to InvestorOS!
              </h2>
              <p className="text-gray-600">
                Your personalized trading experience is ready. Navigate to Legion or Demand Zone Analyzer to get started.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const Dashboard: React.FC = () => {
  return (
    <OnboardingProvider>
      <DashboardContent />
    </OnboardingProvider>
  )
}

export default Dashboard
