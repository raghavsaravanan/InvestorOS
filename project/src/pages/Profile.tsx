import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useOnboarding, OnboardingProvider } from '../contexts/OnboardingContext'
import { OnboardingData, TraderType, RiskLevel, RiskRewardRatio, PortfolioStyle, MarketUniverse, LiquidityLevel, ExplanationStyle } from '../types/onboarding'
import Navbar from '../components/Navbar'

const ProfileContent: React.FC = () => {
  const { data, updateData } = useOnboarding()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<OnboardingData>(data)

  const handleSave = () => {
    updateData(editData)
    setIsEditing(false)
    // Update localStorage
    localStorage.setItem('onboarding-data', JSON.stringify(editData))
  }

  const handleCancel = () => {
    setEditData(data)
    setIsEditing(false)
  }


  const getTraderTypeText = (type: TraderType) => {
    switch (type) {
      case 'day': return 'Day Trader'
      case 'swing': return 'Swing Trader'
      case 'long-term': return 'Long-term Investor'
      default: return type
    }
  }

  const getRiskLevelText = (level: RiskLevel) => {
    switch (level) {
      case 'low': return 'Low Risk (0.5% per trade)'
      case 'medium': return 'Medium Risk (1% per trade)'
      case 'high': return 'High Risk (1.5-2% per trade)'
      default: return level
    }
  }

  const getPortfolioStylesText = (styles: PortfolioStyle[]) => {
    return styles.map(style => {
      switch (style) {
        case 'momentum': return '📈 Momentum Plays'
        case 'value': return '💎 Value/Reversal Setups'
        case 'ai-mix': return '🧠 AI-Picked Mix'
        case 'custom': return '⚙️ Custom Filter'
        default: return style
      }
    }).join(', ')
  }

  const getMarketText = (markets: MarketUniverse[]) => {
    return markets.map(market => {
      switch (market) {
        case 'nasdaq': return 'NASDAQ'
        case 'sp500': return 'S&P 500'
        case 'russell2000': return 'Russell 2000'
        case 'custom': return 'Custom Watchlist'
        default: return market
      }
    }).join(', ')
  }

  const getLiquidityText = (level: LiquidityLevel) => {
    switch (level) {
      case 'high': return 'High Liquidity (≥ 2M shares/day)'
      case 'moderate': return 'Moderate (≥ 500K shares/day)'
      case 'flexible': return 'Flexible (no restriction)'
      default: return level
    }
  }

  const getExplanationText = (style: ExplanationStyle) => {
    switch (style) {
      case 'simple': return 'Simple (Plain English)'
      case 'trader': return 'Trader (Technical Terms)'
      case 'quant': return 'Quant (Full Algorithmic Breakdown)'
      default: return style
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Trading Profile</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>

            <div className="p-6">
              {isEditing ? (
                <EditProfileForm 
                  data={editData} 
                  setData={setEditData}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              ) : (
                <ViewProfile data={data} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface ViewProfileProps {
  data: OnboardingData
}

const ViewProfile: React.FC<ViewProfileProps> = ({ data }) => {
  const getTraderTypeText = (type: TraderType) => {
    switch (type) {
      case 'day': return 'Day Trader'
      case 'swing': return 'Swing Trader'
      case 'long-term': return 'Long-term Investor'
      default: return type
    }
  }

  const getRiskLevelText = (level: RiskLevel) => {
    switch (level) {
      case 'low': return 'Low Risk (0.5% per trade)'
      case 'medium': return 'Medium Risk (1% per trade)'
      case 'high': return 'High Risk (1.5-2% per trade)'
      default: return level
    }
  }

  const getPortfolioStylesText = (styles: PortfolioStyle[]) => {
    return styles.map(style => {
      switch (style) {
        case 'momentum': return '📈 Momentum Plays'
        case 'value': return '💎 Value/Reversal Setups'
        case 'ai-mix': return '🧠 AI-Picked Mix'
        case 'custom': return '⚙️ Custom Filter'
        default: return style
      }
    }).join(', ')
  }

  const getMarketText = (markets: MarketUniverse[]) => {
    return markets.map(market => {
      switch (market) {
        case 'nasdaq': return 'NASDAQ'
        case 'sp500': return 'S&P 500'
        case 'russell2000': return 'Russell 2000'
        case 'custom': return 'Custom Watchlist'
        default: return market
      }
    }).join(', ')
  }

  const getLiquidityText = (level: LiquidityLevel) => {
    switch (level) {
      case 'high': return 'High Liquidity (≥ 2M shares/day)'
      case 'moderate': return 'Moderate (≥ 500K shares/day)'
      case 'flexible': return 'Flexible (no restriction)'
      default: return level
    }
  }

  const getExplanationText = (style: ExplanationStyle) => {
    switch (style) {
      case 'simple': return 'Simple (Plain English)'
      case 'trader': return 'Trader (Technical Terms)'
      case 'quant': return 'Quant (Full Algorithmic Breakdown)'
      default: return style
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Trader Type</h3>
          <p className="text-gray-700">{getTraderTypeText(data.traderType)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Risk Level</h3>
          <p className="text-gray-700">{getRiskLevelText(data.riskLevel)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Risk-Reward Ratio</h3>
          <p className="text-gray-700">{data.riskRewardRatio}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Max Concurrent Trades</h3>
          <p className="text-gray-700">{data.maxTrades}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Liquidity Preference</h3>
          <p className="text-gray-700">{getLiquidityText(data.liquidityLevel)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Explanation Style</h3>
          <p className="text-gray-700">{getExplanationText(data.explanationStyle)}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Portfolio Styles</h3>
        <p className="text-gray-700">{getPortfolioStylesText(data.portfolioStyles)}</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Markets</h3>
        <p className="text-gray-700">{getMarketText(data.marketUniverse)}</p>
        {data.customWatchlist && data.customWatchlist.length > 0 && (
          <div className="mt-2">
            <h4 className="font-medium text-gray-900 mb-1">Custom Watchlist:</h4>
            <div className="flex flex-wrap gap-2">
              {data.customWatchlist.map((ticker, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                >
                  {ticker}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.advancedSettings && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Advanced Settings</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.advancedSettings.accountSize && (
              <div>
                <h4 className="font-medium text-gray-700">Account Size</h4>
                <p className="text-gray-600">${data.advancedSettings.accountSize.toLocaleString()}</p>
              </div>
            )}
            {data.advancedSettings.preferredSectors && data.advancedSettings.preferredSectors.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700">Preferred Sectors</h4>
                <p className="text-gray-600">{data.advancedSettings.preferredSectors.join(', ')}</p>
              </div>
            )}
            {data.advancedSettings.leverage && (
              <div>
                <h4 className="font-medium text-gray-700">Leverage</h4>
                <p className="text-gray-600">{data.advancedSettings.leverage}x</p>
              </div>
            )}
            <div>
              <h4 className="font-medium text-gray-700">Volatility Filter</h4>
              <p className="text-gray-600">{data.advancedSettings.volatilityFilter ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface EditProfileFormProps {
  data: OnboardingData
  setData: (data: OnboardingData) => void
  onSave: () => void
  onCancel: () => void
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ data, setData, onSave, onCancel }) => {
  const updateField = (field: keyof OnboardingData, value: any) => {
    setData({ ...data, [field]: value })
  }

  const updateAdvancedField = (field: string, value: any) => {
    setData({
      ...data,
      advancedSettings: {
        ...data.advancedSettings,
        [field]: value
      }
    })
  }

  const togglePortfolioStyle = (style: PortfolioStyle) => {
    const currentStyles = data.portfolioStyles
    const newStyles = currentStyles.includes(style)
      ? currentStyles.filter(s => s !== style)
      : [...currentStyles, style]
    updateField('portfolioStyles', newStyles)
  }

  const toggleMarket = (market: MarketUniverse) => {
    const currentMarkets = data.marketUniverse
    const newMarkets = currentMarkets.includes(market)
      ? currentMarkets.filter(m => m !== market)
      : [...currentMarkets, market]
    updateField('marketUniverse', newMarkets)
  }

  const toggleSector = (sector: string) => {
    const currentSectors = data.advancedSettings?.preferredSectors || []
    const newSectors = currentSectors.includes(sector)
      ? currentSectors.filter(s => s !== sector)
      : [...currentSectors, sector]
    updateAdvancedField('preferredSectors', newSectors)
  }

  const sectors = [
    'Technology', 'Healthcare', 'Financial', 'Energy', 'Consumer Discretionary',
    'Consumer Staples', 'Industrial', 'Materials', 'Utilities', 'Real Estate'
  ]

  return (
    <div className="space-y-6">
      {/* Trader Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Trader Type</label>
        <select
          value={data.traderType}
          onChange={(e) => updateField('traderType', e.target.value as TraderType)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="day">Day Trader</option>
          <option value="swing">Swing Trader</option>
          <option value="long-term">Long-term Investor</option>
        </select>
      </div>

      {/* Risk Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
        <select
          value={data.riskLevel}
          onChange={(e) => updateField('riskLevel', e.target.value as RiskLevel)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="low">Low Risk (0.5% per trade)</option>
          <option value="medium">Medium Risk (1% per trade)</option>
          <option value="high">High Risk (1.5-2% per trade)</option>
        </select>
      </div>

      {/* Risk-Reward Ratio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Risk-Reward Ratio</label>
        <select
          value={data.riskRewardRatio}
          onChange={(e) => updateField('riskRewardRatio', e.target.value as RiskRewardRatio)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="1:2">1:2 (Conservative)</option>
          <option value="1:3">1:3 (Balanced)</option>
          <option value="1:4">1:4 (Aggressive)</option>
          <option value="1:5">1:5 (Home-run setups only)</option>
        </select>
      </div>

      {/* Portfolio Styles */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Styles</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'momentum' as PortfolioStyle, label: '📈 Momentum Plays' },
            { id: 'value' as PortfolioStyle, label: '💎 Value/Reversal Setups' },
            { id: 'ai-mix' as PortfolioStyle, label: '🧠 AI-Picked Mix' },
            { id: 'custom' as PortfolioStyle, label: '⚙️ Custom Filter' }
          ].map((style) => (
            <label key={style.id} className="flex items-center">
              <input
                type="checkbox"
                checked={data.portfolioStyles.includes(style.id)}
                onChange={() => togglePortfolioStyle(style.id)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{style.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Markets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Markets</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'nasdaq' as MarketUniverse, label: 'NASDAQ' },
            { id: 'sp500' as MarketUniverse, label: 'S&P 500' },
            { id: 'russell2000' as MarketUniverse, label: 'Russell 2000' },
            { id: 'custom' as MarketUniverse, label: 'Custom Watchlist' }
          ].map((market) => (
            <label key={market.id} className="flex items-center">
              <input
                type="checkbox"
                checked={data.marketUniverse.includes(market.id)}
                onChange={() => toggleMarket(market.id)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{market.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Liquidity Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Liquidity Preference</label>
        <select
          value={data.liquidityLevel}
          onChange={(e) => updateField('liquidityLevel', e.target.value as LiquidityLevel)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="high">High Liquidity (≥ 2M shares/day)</option>
          <option value="moderate">Moderate (≥ 500K shares/day)</option>
          <option value="flexible">Flexible (no restriction)</option>
        </select>
      </div>

      {/* Max Trades */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max Concurrent Trades: {data.maxTrades}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={data.maxTrades}
          onChange={(e) => updateField('maxTrades', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>

      {/* Explanation Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Explanation Style</label>
        <select
          value={data.explanationStyle}
          onChange={(e) => updateField('explanationStyle', e.target.value as ExplanationStyle)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="simple">Simple (Plain English)</option>
          <option value="trader">Trader (Technical Terms)</option>
          <option value="quant">Quant (Full Algorithmic Breakdown)</option>
        </select>
      </div>

      {/* Advanced Settings */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Size ($)</label>
            <input
              type="number"
              placeholder="10000"
              value={data.advancedSettings?.accountSize || ''}
              onChange={(e) => updateAdvancedField('accountSize', e.target.value ? parseFloat(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Leverage</label>
            <select
              value={data.advancedSettings?.leverage || 1}
              onChange={(e) => updateAdvancedField('leverage', parseInt(e.target.value) as 1 | 2 | 5)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={5}>5x</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Sectors</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {sectors.map((sector) => (
              <label key={sector} className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.advancedSettings?.preferredSectors?.includes(sector) || false}
                  onChange={() => toggleSector(sector)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{sector}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.advancedSettings?.volatilityFilter || false}
              onChange={(e) => updateAdvancedField('volatilityFilter', e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              Exclude stocks with high volatility (&gt;5% ATR)
            </span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

const Profile: React.FC = () => {
  return (
    <OnboardingProvider>
      <ProfileContent />
    </OnboardingProvider>
  )
}

export default Profile
