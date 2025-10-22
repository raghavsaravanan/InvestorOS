import React, { useState } from 'react'
import { useOnboarding } from '../../contexts/OnboardingContext'
import HelpTooltip from '../HelpTooltip'

const AdvancedSettingsQuestion: React.FC = () => {
  const { data, updateData } = useOnboarding()
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [accountSize, setAccountSize] = useState(data.advancedSettings?.accountSize ? String(data.advancedSettings.accountSize) : '')
  const [selectedSectors, setSelectedSectors] = useState<string[]>(data.advancedSettings?.preferredSectors || [])
  const [leverage, setLeverage] = useState(data.advancedSettings?.leverage || 1)
  const [volatilityFilter, setVolatilityFilter] = useState(data.advancedSettings?.volatilityFilter || false)

  const sectors = [
    'Technology', 'Healthcare', 'Financial', 'Energy', 'Consumer Discretionary',
    'Consumer Staples', 'Industrial', 'Materials', 'Utilities', 'Real Estate'
  ]

  const handleSaveAdvanced = () => {
    updateData({
      advancedSettings: {
        accountSize: accountSize ? parseFloat(accountSize) : undefined,
        preferredSectors: selectedSectors,
        leverage: leverage as 1 | 2 | 5,
        volatilityFilter
      }
    })
  }

  const toggleSector = (sector: string) => {
    setSelectedSectors(prev => 
      prev.includes(sector) 
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>
          Advanced Settings (Optional)
        </h2>
        <p className="text-lg" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          Fine-tune your trading preferences for more personalized recommendations
        </p>
      </div>

      <div className="rounded-lg shadow-lg p-8" style={{ backgroundColor: '#2A2A2A' }}>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between p-4 rounded-lg transition-colors"
          style={{ backgroundColor: '#333333', color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}
        >
          <span className="text-lg font-semibold">Show Advanced Settings</span>
          <svg 
            className={`w-5 h-5 transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAdvanced && (
          <div className="mt-6 space-y-6">
            {/* Account Size */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
                Account Size ($)
              </label>
              <input
                type="number"
                placeholder="10000"
                value={accountSize}
                onChange={(e) => setAccountSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs mt-1" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
                Helps calculate position sizes and risk management
              </p>
            </div>

            {/* Preferred Sectors */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
                Preferred Sectors
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {sectors.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => toggleSector(sector)}
                    className={`p-2 text-sm rounded-md border transition-colors ${
                      selectedSectors.includes(sector)
                        ? 'bg-indigo-100 border-indigo-500 text-indigo-800'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>

            {/* Leverage */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
                Leverage
              </label>
              <div className="flex space-x-4">
                {([1, 2, 5] as const).map((value) => (
                  <button
                    key={value}
                    onClick={() => setLeverage(value)}
                    className={`px-4 py-2 rounded-md border transition-colors ${
                      leverage === value
                        ? 'bg-indigo-100 border-indigo-500 text-indigo-800'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {value}x
                  </button>
                  ))}
              </div>
              <p className="text-xs mt-1" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
                <HelpTooltip
                  term="Leverage"
                  explanation="Using borrowed money to increase your trading position size, amplifying both gains and losses."
                  examples={[
                    "2x leverage means you can trade with $20,000 using only $10,000",
                    "Higher leverage = higher risk and reward"
                  ]}
                /> - Higher leverage increases both potential gains and losses
              </p>
            </div>

            {/* Volatility Filter */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="volatilityFilter"
                checked={volatilityFilter}
                onChange={(e) => setVolatilityFilter(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="volatilityFilter" className="text-sm font-medium" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
                Exclude stocks with high volatility (&gt;5% ATR)
              </label>
            </div>
            <p className="text-xs" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
              <HelpTooltip
                term="ATR (Average True Range)"
                explanation="A measure of market volatility that shows how much a stock typically moves in a day."
                examples={[
                  "A stock with 5% ATR might move $5 on a $100 stock",
                  "Higher ATR = more volatile = riskier"
                ]}
              /> - Filters out very volatile stocks
            </p>

            <button
              onClick={handleSaveAdvanced}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save Advanced Settings
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#2A2A2A' }}>
        <h4 className="font-semibold mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>Advanced settings explained:</h4>
        <div className="space-y-2 text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          <p>
            <strong>Account Size:</strong> Helps us calculate appropriate position sizes 
            and risk management for your specific capital.
          </p>
          <p>
            <strong>Sector Preferences:</strong> Focus on industries you understand or 
            want to learn about.
          </p>
          <p>
            <strong>Leverage:</strong> Only use if you understand the risks. 
            Higher leverage = higher potential returns but also higher losses.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdvancedSettingsQuestion
