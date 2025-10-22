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
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="py-8">
        <CurrentComponent />
      </div>

      {/* Navigation */}
      <div className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
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
