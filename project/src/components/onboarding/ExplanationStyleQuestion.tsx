import React from 'react'
import { useOnboarding } from '../../contexts/OnboardingContext'
import { ExplanationStyle } from '../../types/onboarding'
import HelpTooltip from '../HelpTooltip'

const ExplanationStyleQuestion: React.FC = () => {
  const { data, updateData } = useOnboarding()

  const explanationStyles = [
    {
      id: 'simple' as ExplanationStyle,
      title: 'Simple',
      icon: '👶',
      description: 'Plain English explanations',
      details: 'Easy to understand, perfect for beginners',
      examples: [
        'The stock is going up because more people want to buy it',
        'This pattern usually means the price will continue rising'
      ]
    },
    {
      id: 'trader' as ExplanationStyle,
      title: 'Trader',
      icon: '🎓',
      description: 'Uses technical terms',
      details: 'For those familiar with trading concepts',
      examples: [
        'Bullish momentum with strong volume confirmation',
        'Breakout above resistance with RSI divergence'
      ]
    },
    {
      id: 'quant' as ExplanationStyle,
      title: 'Quant',
      icon: '🧮',
      description: 'Full algorithmic breakdown',
      details: 'Complete mathematical analysis and data',
      examples: [
        'RSI(14) = 67.3, MACD(12,26,9) = 0.45, Volume ratio = 1.8x',
        'Statistical significance: p-value < 0.05, Sharpe ratio = 2.1'
      ]
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How do you want the AI to explain setups?
        </h2>
        <p className="text-lg text-gray-600">
          Choose your preferred level of technical detail
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {explanationStyles.map((style) => (
          <div
            key={style.id}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
              data.explanationStyle === style.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => updateData({ explanationStyle: style.id })}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{style.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {style.title}
              </h3>
              <p className="text-gray-600 mb-3">{style.description}</p>
              <p className="text-sm text-gray-500 mb-4">{style.details}</p>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Example:</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  {style.examples.map((example, index) => (
                    <p key={index} className="italic">"{example}"</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Understanding explanation styles:</h4>
        <div className="space-y-3 text-sm text-blue-800">
          <div>
            <HelpTooltip
              term="Simple Explanations"
              explanation="Plain English descriptions that anyone can understand, focusing on what's happening and why."
              examples={[
                "The stock is going up because more people are buying than selling",
                "This usually means the price will keep going up for a while"
              ]}
            /> - Perfect for beginners or those who prefer straightforward language.
          </div>
          <div>
            <HelpTooltip
              term="Trader Explanations"
              explanation="Uses common trading terminology and technical concepts that experienced traders understand."
              examples={[
                "Bullish momentum with volume confirmation",
                "Breakout above key resistance level"
              ]}
            /> - For those familiar with trading terms and concepts.
          </div>
          <div>
            <HelpTooltip
              term="Quant Explanations"
              explanation="Full mathematical and statistical analysis with precise numbers, algorithms, and data points."
              examples={[
                "RSI(14) = 67.3, MACD(12,26,9) = 0.45",
                "Statistical significance: p-value < 0.05"
              ]}
            /> - Complete algorithmic breakdown with all the data and math.
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExplanationStyleQuestion
