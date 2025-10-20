import React from 'react'
import { useOnboarding } from '../../contexts/OnboardingContext'

const OnboardingComplete: React.FC = () => {
  const { data } = useOnboarding()

  const getTraderTypeText = (type: string) => {
    switch (type) {
      case 'day': return 'Day Trader'
      case 'swing': return 'Swing Trader'
      case 'long-term': return 'Long-term Investor'
      default: return type
    }
  }

  const getRiskLevelText = (level: string) => {
    switch (level) {
      case 'low': return 'Low Risk (0.5% per trade)'
      case 'medium': return 'Medium Risk (1% per trade)'
      case 'high': return 'High Risk (1.5-2% per trade)'
      default: return level
    }
  }

  const getPortfolioStylesText = (styles: string[]) => {
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to InvestorOS!
            </h1>
            <p className="text-lg text-gray-600">
              Your personalized trading profile has been created successfully.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Trading Profile</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Trader Type</h3>
                <p className="text-gray-900">{getTraderTypeText(data.traderType)}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Risk Level</h3>
                <p className="text-gray-900">{getRiskLevelText(data.riskLevel)}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Risk-Reward Ratio</h3>
                <p className="text-gray-900">{data.riskRewardRatio}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Max Concurrent Trades</h3>
                <p className="text-gray-900">{data.maxTrades}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-700 mb-2">Portfolio Styles</h3>
                <p className="text-gray-900">{getPortfolioStylesText(data.portfolioStyles)}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-700 mb-2">Markets</h3>
                <p className="text-gray-900">
                  {data.marketUniverse.map(market => {
                    switch (market) {
                      case 'nasdaq': return 'NASDAQ'
                      case 'sp500': return 'S&P 500'
                      case 'russell2000': return 'Russell 2000'
                      case 'custom': return 'Custom Watchlist'
                      default: return market
                    }
                  }).join(', ')}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What's Next?
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">Legion</h4>
                <p className="text-sm text-indigo-700">
                  Access advanced trading tools and analysis
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Demand Zone Analyzer</h4>
                <p className="text-sm text-green-700">
                  Analyze market demand zones and trading opportunities
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              Your preferences have been saved and will be used to personalize your trading experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingComplete
