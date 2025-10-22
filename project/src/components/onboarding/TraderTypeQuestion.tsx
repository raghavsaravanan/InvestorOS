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
      details: 'Quick trades, high activity, requires constant monitoring'
    },
    {
      id: 'swing' as TraderType,
      title: 'Swing Trader',
      description: 'Hold positions for days to weeks',
      details: 'Medium-term trades, less time-intensive, good for part-time traders'
    },
    {
      id: 'long-term' as TraderType,
      title: 'Long-term Investor',
      description: 'Hold positions for months to years',
      details: 'Fundamental analysis, buy and hold strategy, minimal daily involvement'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4" style={{ color: '#CEAD41', fontFamily: 'Italiana, serif', letterSpacing: '0.05em' }}>
          Trader Profile
        </h2>
        <p className="text-lg" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          Select your trading style
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {traderTypes.map((type) => (
          <div
            key={type.id}
            className={`p-8 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
              data.traderType === type.id
                ? 'border-[#CEAD41]'
                : 'border-[#3A3A3A] hover:border-[#CEAD41]'
            }`}
            style={{ backgroundColor: data.traderType === type.id ? 'rgba(206, 173, 65, 0.05)' : 'transparent' }}
            onClick={() => updateData({ traderType: type.id })}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#CEAD41', fontFamily: 'Italiana, serif', letterSpacing: '0.05em' }}>
                {type.title}
              </h3>
              <p className="mb-3 text-base" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{type.description}</p>
              <p className="text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif', opacity: 0.8 }}>{type.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-lg border border-[#3A3A3A]" style={{ backgroundColor: 'rgba(206, 173, 65, 0.03)' }}>
        <h4 className="font-semibold mb-3 text-base" style={{ color: '#CEAD41', fontFamily: 'Aboreto, serif' }}>Trading Style Guide</h4>
        <div className="space-y-3 text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
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
