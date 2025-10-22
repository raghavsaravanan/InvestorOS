import React from 'react'
import { useOnboarding } from '../../contexts/OnboardingContext'
import { RiskLevel } from '../../types/onboarding'
import HelpTooltip from '../HelpTooltip'

const RiskLevelQuestion: React.FC = () => {
  const { data, updateData } = useOnboarding()

  const riskLevels = [
    {
      id: 'low' as RiskLevel,
      title: 'Conservative',
      percentage: '0.5% per trade',
      description: 'Small position sizes, steady approach',
      color: 'green',
      details: 'Ideal for capital preservation and steady growth'
    },
    {
      id: 'medium' as RiskLevel,
      title: 'Balanced',
      percentage: '1% per trade',
      description: 'Moderate position sizes, balanced strategy',
      color: 'yellow',
      details: 'Optimal balance of growth and risk management'
    },
    {
      id: 'high' as RiskLevel,
      title: 'Aggressive',
      percentage: '1.5-2% per trade',
      description: 'Larger position sizes, higher volatility',
      color: 'red',
      details: 'Maximum growth potential with elevated risk'
    }
  ]

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = 'border-2 rounded-lg p-8 cursor-pointer transition-all duration-300'
    
    if (isSelected) {
      return `${baseClasses} border-[#CEAD41]`
    }
    
    return `${baseClasses} border-[#3A3A3A] hover:border-[#CEAD41]`
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4" style={{ color: '#CEAD41', fontFamily: 'Italiana, serif', letterSpacing: '0.05em' }}>
          Risk Tolerance
        </h2>
        <p className="text-lg" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          Define your risk per trade
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {riskLevels.map((level) => (
          <div
            key={level.id}
            className={getColorClasses(level.color, data.riskLevel === level.id)}
            style={{ backgroundColor: data.riskLevel === level.id ? 'rgba(206, 173, 65, 0.05)' : 'transparent' }}
            onClick={() => updateData({ riskLevel: level.id })}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#CEAD41', fontFamily: 'Italiana, serif', letterSpacing: '0.05em' }}>
                {level.title}
              </h3>
              <div className="text-3xl font-bold mb-4" style={{ color: '#CEAD41', fontFamily: 'Aboreto, serif' }}>
                {level.percentage}
              </div>
              <p className="mb-3 text-base" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{level.description}</p>
              <p className="text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif', opacity: 0.8 }}>{level.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-lg border border-[#3A3A3A]" style={{ backgroundColor: 'rgba(206, 173, 65, 0.03)' }}>
        <h4 className="font-semibold mb-3 text-base" style={{ color: '#CEAD41', fontFamily: 'Aboreto, serif' }}>Risk Management Guide</h4>
        <div className="space-y-3 text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          <p>
            <HelpTooltip
              term="Risk per trade"
              explanation="The maximum amount of your account you're willing to lose on a single trade. This is usually expressed as a percentage of your total account value."
              examples={[
                "If you have $10,000 and risk 1% per trade, you risk $100 per trade",
                "If the trade goes against you and hits your stop loss, you lose $100 maximum"
              ]}
            /> is the maximum amount you're willing to lose on any single trade.
          </p>
          <p>
            <strong>Example:</strong> If you have a $10,000 account and choose 1% risk per trade, 
            you would risk a maximum of $100 on each trade. This means if you lose 10 trades in a row, 
            you'd only lose 10% of your account instead of going broke.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RiskLevelQuestion
