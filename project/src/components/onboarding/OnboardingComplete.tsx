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
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1E1E1E' }}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="rounded-lg shadow-lg p-8" style={{ backgroundColor: '#2A2A2A' }}>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold mb-4" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>
              Welcome to InvestorOS!
            </h1>
            <p className="text-lg" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
              Your personalized trading profile has been created successfully.
            </p>
          </div>

          <div className="rounded-lg p-6 mb-8" style={{ backgroundColor: '#333333' }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>Your Trading Profile</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>Trader Type</h3>
                <p style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{getTraderTypeText(data.traderType)}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>Risk Level</h3>
                <p style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{getRiskLevelText(data.riskLevel)}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>Risk-Reward Ratio</h3>
                <p style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{data.riskRewardRatio}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>Max Concurrent Trades</h3>
                <p style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{data.maxTrades}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-medium mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>Portfolio Styles</h3>
                <p style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{getPortfolioStylesText(data.portfolioStyles)}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-medium mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>Markets</h3>
                <p style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
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
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>
              What's Next?
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#333333' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>Legion</h4>
                <p className="text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
                  Access advanced trading tools and analysis
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#333333' }}>
                <h4 className="font-semibold mb-2" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>Demand Zone Analyzer</h4>
                <p className="text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
                  Analyze market demand zones and trading opportunities
                </p>
              </div>
            </div>
            <p style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
              Your preferences have been saved and will be used to personalize your trading experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingComplete
