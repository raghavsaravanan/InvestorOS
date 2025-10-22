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
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
          console.error('Error loading profile:', error)
          setLoading(false)
          return
        }

        if (profile) {
          // Convert database format to OnboardingData format
          const profileData: OnboardingData = {
            traderType: profile.trader_type,
            riskLevel: profile.risk_level,
            riskRewardRatio: profile.risk_reward_ratio,
            portfolioStyles: profile.portfolio_styles || [],
            marketUniverse: profile.market_universe || [],
            customWatchlist: profile.custom_watchlist || [],
            liquidityLevel: profile.liquidity_level,
            maxTrades: profile.max_trades,
            explanationStyle: profile.explanation_style,
            advancedSettings: {
              accountSize: profile.account_size,
              preferredSectors: profile.preferred_sectors || [],
              leverage: profile.leverage,
              volatilityFilter: profile.volatility_filter
            }
          }
          setData(profileData)
          setIsCompleted(profile.onboarding_completed)
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
    if (!user) return

    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          trader_type: data.traderType,
          risk_level: data.riskLevel,
          risk_reward_ratio: data.riskRewardRatio,
          portfolio_styles: data.portfolioStyles,
          market_universe: data.marketUniverse,
          custom_watchlist: data.customWatchlist || [],
          liquidity_level: data.liquidityLevel,
          max_trades: data.maxTrades,
          explanation_style: data.explanationStyle,
          account_size: data.advancedSettings?.accountSize,
          preferred_sectors: data.advancedSettings?.preferredSectors || [],
          leverage: data.advancedSettings?.leverage,
          volatility_filter: data.advancedSettings?.volatilityFilter || false,
          onboarding_completed: true,
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error saving profile:', error)
        return
      }

      setIsCompleted(true)
    } catch (error) {
      console.error('Error completing onboarding:', error)
    }
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
