import React, { useState } from 'react'
import { useOnboarding } from '../../contexts/OnboardingContext'
import { MarketUniverse } from '../../types/onboarding'
import HelpTooltip from '../HelpTooltip'

const MarketUniverseQuestion: React.FC = () => {
  const { data, updateData } = useOnboarding()
  const [customTickers, setCustomTickers] = useState('')

  const marketOptions = [
    {
      id: 'nasdaq' as MarketUniverse,
      title: 'NASDAQ',
      description: 'Technology and growth stocks',
      icon: '💻',
      details: 'Apple, Microsoft, Google, Tesla, and other tech giants'
    },
    {
      id: 'sp500' as MarketUniverse,
      title: 'S&P 500',
      description: 'Large-cap US companies',
      icon: '🏢',
      details: 'The 500 largest US companies across all sectors'
    },
    {
      id: 'russell2000' as MarketUniverse,
      title: 'Russell 2000',
      description: 'Small-cap companies',
      icon: '🌱',
      details: 'Smaller, more volatile companies with growth potential'
    }
  ]

  const toggleMarket = (market: MarketUniverse) => {
    const currentMarkets = data.marketUniverse
    const newMarkets = currentMarkets.includes(market)
      ? currentMarkets.filter(m => m !== market)
      : [...currentMarkets, market]
    
    updateData({ marketUniverse: newMarkets })
  }

  const handleCustomTickers = () => {
    if (customTickers.trim()) {
      const tickers = customTickers.split(',').map(t => t.trim().toUpperCase()).filter(t => t)
      updateData({ 
        marketUniverse: [...data.marketUniverse, 'custom'],
        customWatchlist: tickers
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Which markets do you want to trade?
        </h2>
        <p className="text-lg text-gray-600">
          Select the markets you want to focus on for your trading
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {marketOptions.map((market) => {
          const isSelected = data.marketUniverse.includes(market.id)
          return (
            <div
              key={market.id}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleMarket(market.id)}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{market.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {market.title}
                </h3>
                <p className="text-gray-600 mb-3">{market.description}</p>
                <p className="text-sm text-gray-500">{market.details}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Custom Watchlist */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Custom Watchlist (Optional)
        </h3>
        <p className="text-gray-600 mb-4">
          Enter specific stock tickers you want to track, separated by commas
        </p>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="AAPL, MSFT, GOOGL, TSLA"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={customTickers}
            onChange={(e) => setCustomTickers(e.target.value)}
          />
          <button
            onClick={handleCustomTickers}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </div>
        {data.customWatchlist && data.customWatchlist.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Your custom watchlist:</p>
            <div className="flex flex-wrap gap-2">
              {data.customWatchlist.map((ticker, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                >
                  {ticker}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Understanding these markets:</h4>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            <HelpTooltip
              term="NASDAQ"
              explanation="A stock exchange focused on technology and growth companies, known for innovation and high volatility."
              examples={[
                "Apple, Microsoft, Google, Amazon, Tesla",
                "Many biotech and software companies"
              ]}
            /> - Technology and growth-focused companies.
          </p>
          <p>
            <HelpTooltip
              term="S&P 500"
              explanation="An index of the 500 largest US companies, representing the overall US economy across all sectors."
              examples={[
                "Includes companies from all sectors: tech, healthcare, finance, energy",
                "More stable and diversified than NASDAQ"
              ]}
            /> - The 500 largest US companies across all sectors.
          </p>
          <p>
            <HelpTooltip
              term="Russell 2000"
              explanation="An index of 2000 small-cap companies, offering higher growth potential but more volatility."
              examples={[
                "Smaller companies with potential for rapid growth",
                "Higher risk but potentially higher returns"
              ]}
            /> - Smaller companies with growth potential.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MarketUniverseQuestion
