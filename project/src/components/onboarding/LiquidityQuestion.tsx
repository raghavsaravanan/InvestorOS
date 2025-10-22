import React from 'react'
import { useOnboarding } from '../../contexts/OnboardingContext'
import { LiquidityLevel } from '../../types/onboarding'
import HelpTooltip from '../HelpTooltip'

const LiquidityQuestion: React.FC = () => {
  const { data, updateData } = useOnboarding()

  const liquidityOptions = [
    {
      id: 'high' as LiquidityLevel,
      title: 'High Liquidity',
      volume: '≥ 2M shares/day',
      description: 'Easy to buy and sell quickly',
      color: 'green',
      details: 'Large-cap stocks, ETFs, major indices. Best for beginners.'
    },
    {
      id: 'moderate' as LiquidityLevel,
      title: 'Moderate',
      volume: '≥ 500K shares/day',
      description: 'Good balance of liquidity and opportunity',
      color: 'blue',
      details: 'Mid-cap stocks, popular growth stocks. Good for most traders.'
    },
    {
      id: 'flexible' as LiquidityLevel,
      title: 'Flexible',
      volume: 'No restriction',
      description: 'Open to all opportunities',
      color: 'purple',
      details: 'Includes small-cap and penny stocks. For experienced traders.'
    }
  ]

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = 'border-2 rounded-lg p-6 cursor-pointer transition-all duration-200'
    
    if (isSelected) {
      switch (color) {
        case 'green':
          return `${baseClasses} border-green-500 bg-green-50`
        case 'blue':
          return `${baseClasses} border-blue-500 bg-blue-50`
        case 'purple':
          return `${baseClasses} border-purple-500 bg-purple-50`
        default:
          return `${baseClasses} border-indigo-500 bg-indigo-50`
      }
    }
    
    return `${baseClasses} border-gray-200 hover:border-gray-300`
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>
          What's the minimum daily trading volume you're comfortable with?
        </h2>
        <p className="text-lg" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          This affects how easily you can enter and exit positions
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {liquidityOptions.map((option) => (
          <div
            key={option.id}
            className={getColorClasses(option.color, data.liquidityLevel === option.id)}
            onClick={() => updateData({ liquidityLevel: option.id })}
          >
            <div className="text-center">
              <div className={`text-4xl mb-4 ${
                option.color === 'green' ? 'text-green-600' :
                option.color === 'blue' ? 'text-blue-600' :
                'text-purple-600'
              }`}>
                {option.color === 'green' ? '🌊' : 
                 option.color === 'blue' ? '💧' : '🌊'}
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>
                {option.title}
              </h3>
              <div className="text-lg font-bold mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
                {option.volume}
              </div>
              <p className="mb-3" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{option.description}</p>
              <p className="text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{option.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#2A2A2A' }}>
        <h4 className="font-semibold mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>What is trading volume and why does it matter?</h4>
        <div className="space-y-2 text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          <p>
            <HelpTooltip
              term="Trading Volume"
              explanation="The number of shares traded in a stock during a given time period, usually measured per day."
              examples={[
                "Apple might trade 50 million shares per day",
                "A small company might trade only 100,000 shares per day"
              ]}
            /> is how many shares of a stock are bought and sold each day.
          </p>
          <p>
            <strong>High Volume Benefits:</strong> Easy to buy/sell without moving the price much, 
            tight bid-ask spreads, less slippage.
          </p>
          <p>
            <strong>Low Volume Risks:</strong> Hard to exit positions quickly, wider spreads, 
            price can move significantly with your trades.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LiquidityQuestion
