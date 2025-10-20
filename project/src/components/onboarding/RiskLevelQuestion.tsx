import React from 'react'
import { useOnboarding } from '../../contexts/OnboardingContext'
import { RiskLevel } from '../../types/onboarding'
import HelpTooltip from '../HelpTooltip'

const RiskLevelQuestion: React.FC = () => {
  const { data, updateData } = useOnboarding()

  const riskLevels = [
    {
      id: 'low' as RiskLevel,
      title: 'Low Risk',
      percentage: '0.5% per trade',
      description: 'Conservative approach, small position sizes',
      color: 'green',
      details: 'Perfect for beginners or those who prefer steady, predictable returns'
    },
    {
      id: 'medium' as RiskLevel,
      title: 'Medium Risk',
      percentage: '1% per trade',
      description: 'Balanced approach, moderate position sizes',
      color: 'yellow',
      details: 'Good balance between growth potential and risk management'
    },
    {
      id: 'high' as RiskLevel,
      title: 'High Risk',
      percentage: '1.5-2% per trade',
      description: 'Aggressive approach, larger position sizes',
      color: 'red',
      details: 'For experienced traders comfortable with higher volatility'
    }
  ]

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = 'border-2 rounded-lg p-6 cursor-pointer transition-all duration-200'
    
    if (isSelected) {
      switch (color) {
        case 'green':
          return `${baseClasses} border-green-500 bg-green-50`
        case 'yellow':
          return `${baseClasses} border-yellow-500 bg-yellow-50`
        case 'red':
          return `${baseClasses} border-red-500 bg-red-50`
        default:
          return `${baseClasses} border-indigo-500 bg-indigo-50`
      }
    }
    
    return `${baseClasses} border-gray-200 hover:border-gray-300`
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How much risk are you comfortable taking per trade?
        </h2>
        <p className="text-lg text-gray-600">
          This determines your position sizing and helps protect your account
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {riskLevels.map((level) => (
          <div
            key={level.id}
            className={getColorClasses(level.color, data.riskLevel === level.id)}
            onClick={() => updateData({ riskLevel: level.id })}
          >
            <div className="text-center">
              <div className={`text-4xl mb-4 ${
                level.color === 'green' ? 'text-green-600' :
                level.color === 'yellow' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {level.color === 'green' ? '🛡️' : level.color === 'yellow' ? '⚖️' : '🚀'}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {level.title}
              </h3>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {level.percentage}
              </div>
              <p className="text-gray-600 mb-3">{level.description}</p>
              <p className="text-sm text-gray-500">{level.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">What does risk per trade mean?</h4>
        <div className="space-y-2 text-sm text-blue-800">
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
