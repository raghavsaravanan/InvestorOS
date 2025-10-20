import React from 'react'
import { useOnboarding } from '../../contexts/OnboardingContext'
import { TraderType } from '../../types/onboarding'
import HelpTooltip from '../HelpTooltip'

const TraderTypeQuestion: React.FC = () => {
  const { data, updateData } = useOnboarding()

  const traderTypes = [
    {
      id: 'day' as TraderType,
      title: 'Day Trader',
      description: 'Buy and sell within the same day',
      icon: '⚡',
      details: 'Quick trades, high activity, requires constant monitoring'
    },
    {
      id: 'swing' as TraderType,
      title: 'Swing Trader',
      description: 'Hold positions for days to weeks',
      icon: '📈',
      details: 'Medium-term trades, less time-intensive, good for part-time traders'
    },
    {
      id: 'long-term' as TraderType,
      title: 'Long-term Investor',
      description: 'Hold positions for months to years',
      icon: '🏛️',
      details: 'Fundamental analysis, buy and hold strategy, minimal daily involvement'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What type of trader are you?
        </h2>
        <p className="text-lg text-gray-600">
          This helps us customize your experience and recommendations
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {traderTypes.map((type) => (
          <div
            key={type.id}
            className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              data.traderType === type.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => updateData({ traderType: type.id })}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{type.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {type.title}
              </h3>
              <p className="text-gray-600 mb-3">{type.description}</p>
              <p className="text-sm text-gray-500">{type.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Need help understanding these terms?</h4>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            <HelpTooltip
              term="Day Trading"
              explanation="Buying and selling stocks within the same trading day, often multiple times. Requires active monitoring and quick decision-making."
              examples={[
                "Buy AAPL at 9:30 AM, sell at 2:00 PM same day",
                "Make 5-10 trades per day on different stocks"
              ]}
            /> involves buying and selling within the same day.
          </p>
          <p>
            <HelpTooltip
              term="Swing Trading"
              explanation="Holding positions for several days to weeks, capturing price swings or trends."
              examples={[
                "Buy a stock on Monday, sell it on Friday",
                "Hold a position for 2-3 weeks during an uptrend"
              ]}
            /> means holding positions for days to weeks.
          </p>
          <p>
            <HelpTooltip
              term="Long-term Investing"
              explanation="Buying stocks with the intention of holding them for months or years, focusing on company fundamentals."
              examples={[
                "Buy and hold Apple stock for 2+ years",
                "Invest in index funds for retirement"
              ]}
            /> focuses on long-term company growth.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TraderTypeQuestion
