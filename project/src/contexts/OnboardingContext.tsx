import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'
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
  completeOnboarding: () => Promise<void>
  loading: boolean
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
  const { user } = useAuth()
  const [data, setData] = useState<OnboardingData>(defaultData)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

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

  // Load existing profile data from Supabase
  useEffect(() => {
    const loadProfileData = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const { data: profile, error } = await supabase
  .from('user_profiles')
  .select(`
    trader_type,
    risk_level,
    risk_reward_ratio,
    portfolio_style,
    market_universe,
    liquidity_preference,
    max_concurrent_trades,
    advanced_settings,
    explanation_style
  `)
  .eq('id', user.id)
  .single()

if (error && error.code !== 'PGRST116') {
  console.error('Error loading profile:', error)
  setLoading(false)
  return
}

if (profile) {
  const profileData: OnboardingData = {
    traderType: profile.trader_type,
    riskLevel: profile.risk_level,
    riskRewardRatio: profile.risk_reward_ratio,
    portfolioStyles: profile.portfolio_style ? [profile.portfolio_style] : [],
    marketUniverse: profile.market_universe ?? [],
    liquidityLevel: profile.liquidity_preference,
    maxTrades: profile.max_concurrent_trades,
    explanationStyle: profile.explanation_style,
    advancedSettings: profile.advanced_settings ?? undefined,
  }
  setData(profileData)
  setIsCompleted(true)
}

      } catch (error) {
        console.error('Error loading profile data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfileData()
  }, [user])

  const completeOnboarding = async () => {
  const { data: { user }, error: userErr } = await supabase.auth.getUser()
  if (userErr || !user) {
    console.error('No authenticated user', userErr)
    return
  }
  console.log('Saving profile for user id:', user.id)

  const payload = {
    id: user.id, // must exist in auth.users
    trader_type: data.traderType,
    risk_level: data.riskLevel,
    risk_reward_ratio: data.riskRewardRatio,
    portfolio_style: data.portfolioStyles?.[0] ?? null,
    market_universe: data.marketUniverse,
    liquidity_preference: data.liquidityLevel,
    max_concurrent_trades: data.maxTrades,
    explanation_style: data.explanationStyle,
    advanced_settings: data.advancedSettings ?? null,
  }

  const { error } = await supabase.from('user_profiles').upsert(payload, { onConflict: 'id' })
  if (error) {
    console.error('Error saving profile:', {
      code: error.code, message: error.message, details: error.details, hint: error.hint
    })
    return
  }

  setIsCompleted(true)
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
    completeOnboarding,
    loading
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}
