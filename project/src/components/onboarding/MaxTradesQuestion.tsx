import React from 'react'
import { useOnboarding } from '../../contexts/OnboardingContext'
import HelpTooltip from '../HelpTooltip'

const MaxTradesQuestion: React.FC = () => {
  const { data, updateData } = useOnboarding()

  const handleSliderChange = (value: number) => {
    updateData({ maxTrades: value })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How many trades do you want to manage at once?
        </h2>
        <p className="text-lg text-gray-600">
          This helps us limit your exposure and prevent overtrading
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-indigo-600 mb-4">
            {data.maxTrades}
          </div>
          <p className="text-xl text-gray-600">concurrent trades</p>
        </div>

        <div className="mb-8">
          <input
            type="range"
            min="1"
            max="10"
            value={data.maxTrades}
            onChange={(e) => handleSliderChange(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${(data.maxTrades - 1) * 11.11}%, #e5e7eb ${(data.maxTrades - 1) * 11.11}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl mb-2">🛡️</div>
            <h3 className="font-semibold text-green-800">Conservative</h3>
            <p className="text-sm text-green-600">1-3 trades</p>
            <p className="text-xs text-green-500 mt-1">Focus on quality over quantity</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">⚖️</div>
            <h3 className="font-semibold text-blue-800">Balanced</h3>
            <p className="text-sm text-blue-600">4-6 trades</p>
            <p className="text-xs text-blue-500 mt-1">Good diversification</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="font-semibold text-orange-800">Active</h3>
            <p className="text-sm text-orange-600">7-10 trades</p>
            <p className="text-xs text-orange-500 mt-1">High activity trading</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Why limit concurrent trades?</h4>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            <HelpTooltip
              term="Position Sizing"
              explanation="The amount of money you allocate to each trade, usually as a percentage of your total account."
              examples={[
                "If you have $10,000 and want 5 trades, you might risk $200 per trade",
                "This ensures you don't put all your money in one basket"
              ]}
            /> helps you manage risk by spreading your capital across multiple opportunities.
          </p>
          <p>
            <strong>Benefits:</strong> Prevents overtrading, reduces emotional stress, 
            allows for better focus on each position.
          </p>
          <p>
            <strong>Example:</strong> With a $10,000 account and 5 max trades, you might risk 
            $200 per trade (1% risk per trade), keeping $9,000 in reserve.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MaxTradesQuestion
