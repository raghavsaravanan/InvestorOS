import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../contexts/OnboardingContext'
import TraderTypeQuestion from './TraderTypeQuestion'
import RiskLevelQuestion from './RiskLevelQuestion'
import RiskRewardQuestion from './RiskRewardQuestion'
import PortfolioStyleQuestion from './PortfolioStyleQuestion'
import MarketUniverseQuestion from './MarketUniverseQuestion'
import LiquidityQuestion from './LiquidityQuestion'
import MaxTradesQuestion from './MaxTradesQuestion'
import AdvancedSettingsQuestion from './AdvancedSettingsQuestion'
import ExplanationStyleQuestion from './ExplanationStyleQuestion'
import OnboardingComplete from './OnboardingComplete'

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate()
  const { currentStep, nextStep, prevStep, totalSteps, completeOnboarding, isCompleted } = useOnboarding()

  const steps = [
    { component: TraderTypeQuestion, title: 'Trader Type' },
    { component: RiskLevelQuestion, title: 'Risk Level' },
    { component: RiskRewardQuestion, title: 'Risk-Reward Ratio' },
    { component: PortfolioStyleQuestion, title: 'Portfolio Style' },
    { component: MarketUniverseQuestion, title: 'Market Universe' },
    { component: LiquidityQuestion, title: 'Liquidity Preference' },
    { component: MaxTradesQuestion, title: 'Max Concurrent Trades' },
    { component: AdvancedSettingsQuestion, title: 'Advanced Settings' },
    { component: ExplanationStyleQuestion, title: 'Explanation Style' }
  ]

  const CurrentComponent = steps[currentStep].component

  const handleNext = async () => {
    if (currentStep === totalSteps - 1) {
      await completeOnboarding()
      // Redirect to dashboard after completing onboarding
      navigate('/dashboard', { replace: true })
    } else {
      nextStep()
    }
  }

  // Show completion screen if onboarding is completed
  if (isCompleted) {
    return <OnboardingComplete />
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      prevStep()
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1E1E1E' }}>
      {/* Progress Bar */}
      <div style={{ backgroundColor: '#1E1E1E', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm font-medium" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
              {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full rounded-full h-2" style={{ backgroundColor: '#3A3A3A' }}>
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%`, backgroundColor: '#CEAD41' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="py-8">
        <CurrentComponent />
      </div>

      {/* Navigation */}
      <div style={{ backgroundColor: '#1E1E1E', borderTop: '1px solid rgba(198, 197, 196, 0.2)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-8 py-3 rounded-md font-medium transition-colors ${
                currentStep === 0
                  ? 'cursor-not-allowed'
                  : 'border border-[#CEAD41]'
              }`}
              style={{ 
                color: currentStep === 0 ? '#5A5A5A' : '#CEAD41', 
                fontFamily: 'Aboreto, serif',
                backgroundColor: 'transparent'
              }}
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: index <= currentStep ? '#CEAD41' : '#3A3A3A' }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-md focus:outline-none transition-colors"
              style={{ 
                backgroundColor: '#CEAD41', 
                color: '#1E1E1E', 
                fontFamily: 'Aboreto, serif',
                fontWeight: '600'
              }}
            >
              {currentStep === totalSteps - 1 ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingFlow
