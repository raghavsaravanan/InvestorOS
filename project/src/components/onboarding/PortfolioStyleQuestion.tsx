import React from 'react'
import { useOnboarding } from '../../contexts/OnboardingContext'
import { PortfolioStyle } from '../../types/onboarding'
import HelpTooltip from '../HelpTooltip'

const PortfolioStyleQuestion: React.FC = () => {
  const { data, updateData } = useOnboarding()

  const portfolioStyles = [
    {
      id: 'momentum' as PortfolioStyle,
      title: 'Momentum Plays',
      icon: '📈',
      description: 'Follow the trend, ride the wave',
      details: 'Buy stocks that are already moving up, sell when momentum slows'
    },
    {
      id: 'value' as PortfolioStyle,
      title: 'Value/Reversal Setups',
      icon: '💎',
      description: 'Find undervalued gems',
      details: 'Buy stocks that are oversold or undervalued, wait for price to recover'
    },
    {
      id: 'ai-mix' as PortfolioStyle,
      title: 'AI-Picked Mix',
      icon: '🧠',
      description: 'Let AI find the best opportunities',
      details: 'Our AI analyzes market data to find optimal entry and exit points'
    },
    {
      id: 'custom' as PortfolioStyle,
      title: 'Custom Filter',
      icon: '⚙️',
      description: 'Create your own criteria',
      details: 'Set up custom filters based on your specific trading preferences'
    }
  ]

  const toggleStyle = (style: PortfolioStyle) => {
    const currentStyles = data.portfolioStyles
    const newStyles = currentStyles.includes(style)
      ? currentStyles.filter(s => s !== style)
      : [...currentStyles, style]
    
    updateData({ portfolioStyles: newStyles })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>
          How do you want your portfolio to look?
        </h2>
        <p className="text-lg" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          Choose one or more styles that match your trading approach
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {portfolioStyles.map((style) => {
          const isSelected = data.portfolioStyles.includes(style.id)
          return (
            <div
              key={style.id}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleStyle(style.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{style.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>
                    {style.title}
                  </h3>
                  <p className="mb-3" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{style.description}</p>
                  <p className="text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{style.details}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#2A2A2A' }}>
        <h4 className="font-semibold mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>Understanding these trading styles:</h4>
        <div className="space-y-3 text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          <div>
            <HelpTooltip
              term="Momentum Trading"
              explanation="Buying stocks that are already moving in a strong direction, expecting the trend to continue."
              examples={[
                "Buy a stock that's up 5% today and still climbing",
                "Follow breakouts from key resistance levels"
              ]}
            /> - Following stocks that are already moving up strongly.
          </div>
          <div>
            <HelpTooltip
              term="Value Trading"
              explanation="Finding stocks that are trading below their true worth, often after a decline."
              examples={[
                "Buy a good company after bad news causes a 20% drop",
                "Find stocks trading below their book value"
              ]}
            /> - Finding undervalued stocks that should recover.
          </div>
          <div>
            <HelpTooltip
              term="AI-Picked Mix"
              explanation="Using artificial intelligence to analyze multiple factors and find the best trading opportunities."
              examples={[
                "AI analyzes 1000+ stocks and picks the top 10",
                "Machine learning identifies patterns humans might miss"
              ]}
            /> - Let our AI find the best opportunities for you.
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioStyleQuestion
