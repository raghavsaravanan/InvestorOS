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
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4" style={{ color: '#CEAD41', fontFamily: 'Italiana, serif', letterSpacing: '0.05em' }}>
          Portfolio Size
        </h2>
        <p className="text-lg" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          Maximum concurrent trades
        </p>
      </div>

      <div className="rounded-lg shadow-lg p-8" style={{ backgroundColor: '#2A2A2A' }}>
        <div className="text-center mb-8">
          <div className="text-7xl font-bold mb-4" style={{ color: '#CEAD41', fontFamily: 'Italiana, serif' }}>
            {data.maxTrades}
          </div>
          <p className="text-xl" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>Concurrent Trades</p>
        </div>

        <div className="mb-8">
          <input
            type="range"
            min="1"
            max="10"
            value={data.maxTrades}
            onChange={(e) => handleSliderChange(parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #CEAD41 0%, #CEAD41 ${(data.maxTrades - 1) * 11.11}%, #3A3A3A ${(data.maxTrades - 1) * 11.11}%, #3A3A3A 100%)`
            }}
          />
          <div className="flex justify-between text-sm mt-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
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
          <div className="p-6 rounded-lg border border-[#3A3A3A]">
            <h3 className="font-bold mb-2" style={{ color: '#CEAD41', fontFamily: 'Italiana, serif' }}>Conservative</h3>
            <p className="text-sm mb-1" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>1-3 Trades</p>
            <p className="text-xs" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif', opacity: 0.7 }}>Quality over quantity</p>
          </div>
          <div className="p-6 rounded-lg border border-[#3A3A3A]">
            <h3 className="font-bold mb-2" style={{ color: '#CEAD41', fontFamily: 'Italiana, serif' }}>Balanced</h3>
            <p className="text-sm mb-1" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>4-6 Trades</p>
            <p className="text-xs" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif', opacity: 0.7 }}>Optimal diversification</p>
          </div>
          <div className="p-6 rounded-lg border border-[#3A3A3A]">
            <h3 className="font-bold mb-2" style={{ color: '#CEAD41', fontFamily: 'Italiana, serif' }}>Active</h3>
            <p className="text-sm mb-1" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>7-10 Trades</p>
            <p className="text-xs" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif', opacity: 0.7 }}>Maximum activity</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#2A2A2A' }}>
        <h4 className="font-semibold mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>Why limit concurrent trades?</h4>
        <div className="space-y-2 text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
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
