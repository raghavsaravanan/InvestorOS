import React from 'react'
import { useOnboarding } from '../../contexts/OnboardingContext'
import { RiskRewardRatio } from '../../types/onboarding'
import HelpTooltip from '../HelpTooltip'

const RiskRewardQuestion: React.FC = () => {
  const { data, updateData } = useOnboarding()

  const riskRewardOptions = [
    {
      id: '1:2' as RiskRewardRatio,
      title: 'Conservative',
      ratio: '1:2',
      description: 'Risk $1 to make $2',
      details: 'Lower risk, steady returns'
    },
    {
      id: '1:3' as RiskRewardRatio,
      title: 'Balanced',
      ratio: '1:3',
      description: 'Risk $1 to make $3',
      details: 'Optimal risk-reward balance'
    },
    {
      id: '1:4' as RiskRewardRatio,
      title: 'Aggressive',
      ratio: '1:4',
      description: 'Risk $1 to make $4',
      details: 'Higher reward potential'
    },
    {
      id: '1:5' as RiskRewardRatio,
      title: 'Maximum',
      ratio: '1:5',
      description: 'Risk $1 to make $5',
      details: 'Selective, high-reward setups'
    }
  ]

  const getColorClasses = (isSelected: boolean) => {
    const baseClasses = 'border-2 rounded-lg p-8 cursor-pointer transition-all duration-300'
    
    if (isSelected) {
      return `${baseClasses} border-[#CEAD41]`
    }
    
    return `${baseClasses} border-[#3A3A3A] hover:border-[#CEAD41]`
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>
          What's your preferred risk-to-reward ratio?
        </h2>
        <p className="text-lg" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          This determines how much profit you aim for relative to your risk
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskRewardOptions.map((option) => (
          <div
            key={option.id}
            className={getColorClasses(option.color, data.riskRewardRatio === option.id)}
            onClick={() => updateData({ riskRewardRatio: option.id })}
          >
            <div className="text-center">
              <div className={`text-3xl mb-3 ${
                option.color === 'green' ? 'text-green-600' :
                option.color === 'blue' ? 'text-blue-600' :
                option.color === 'orange' ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {option.color === 'green' ? '🛡️' : 
                 option.color === 'blue' ? '⚖️' : 
                 option.color === 'orange' ? '🎯' : '🚀'}
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>
                {option.title}
              </h3>
              <div className="text-xl font-bold mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
                {option.ratio}
              </div>
              <p className="text-sm mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{option.description}</p>
              <p className="text-xs" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{option.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#2A2A2A' }}>
        <h4 className="font-semibold mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>What is risk-to-reward ratio?</h4>
        <div className="space-y-2 text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          <p>
            <HelpTooltip
              term="Risk-to-Reward Ratio"
              explanation="A measure of how much profit you expect to make compared to how much you're willing to lose on a trade."
              examples={[
                "1:3 ratio means you risk $100 to potentially make $300",
                "If you lose, you lose $100. If you win, you make $300"
              ]}
            /> compares your potential profit to your potential loss.
          </p>
          <p>
            <strong>Example:</strong> If you buy a stock at $100, set a stop loss at $95 (risk $5), 
            and target $110 (reward $10), your risk-to-reward ratio is 1:2.
          </p>
          <p>
            <strong>Why it matters:</strong> Even if you're right only 40% of the time with a 1:3 ratio, 
            you'll still be profitable in the long run because your wins are bigger than your losses.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RiskRewardQuestion
