import React, { createContext, useContext, useState, useEffect } from 'react'
import { OnboardingData, TraderType, RiskLevel, RiskRewardRatio, PortfolioStyle, MarketUniverse, LiquidityLevel, ExplanationStyle } from '../types/onboarding'

interface OnboardingContextType {
  data: OnboardingData
  updateData: (updates: Partial<OnboardingData>) => void
  isCompleted: boolean
  currentStep: number
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  totalSteps: number
  completeOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export const useOnboarding = () => {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}

interface OnboardingProviderProps {
  children: React.ReactNode
}

const defaultData: OnboardingData = {
  traderType: 'swing',
  riskLevel: 'medium',
  riskRewardRatio: '1:3',
  portfolioStyles: [],
  marketUniverse: ['nasdaq'],
  liquidityLevel: 'moderate',
  maxTrades: 5,
  explanationStyle: 'simple'
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(defaultData)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const totalSteps = 9

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  // Check if onboarding is completed (stored in localStorage)
  useEffect(() => {
    const completed = localStorage.getItem('onboarding-completed')
    if (completed === 'true') {
      setIsCompleted(true)
    }
  }, [])

  const completeOnboarding = () => {
    setIsCompleted(true)
    localStorage.setItem('onboarding-completed', 'true')
    localStorage.setItem('onboarding-data', JSON.stringify(data))
  }

  const value = {
    data,
    updateData,
    isCompleted,
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    totalSteps,
    completeOnboarding
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}
