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
      details: 'Leading technology companies and innovative sectors'
    },
    {
      id: 'sp500' as MarketUniverse,
      title: 'S&P 500',
      description: 'Large-cap US companies',
      details: 'The 500 largest US companies across all sectors'
    },
    {
      id: 'russell2000' as MarketUniverse,
      title: 'Dow Jones',
      description: 'Industrial average blue chips',
      details: '30 prominent companies representing market strength'
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
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4" style={{ color: '#CEAD41', fontFamily: 'Italiana, serif', letterSpacing: '0.05em' }}>
          Market Universe
        </h2>
        <p className="text-lg" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
          Select your trading markets
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {marketOptions.map((market) => {
          const isSelected = data.marketUniverse.includes(market.id)
          return (
            <div
              key={market.id}
            className={`border-2 rounded-lg p-8 cursor-pointer transition-all duration-300 ${
              isSelected
                ? 'border-[#CEAD41]'
                : 'border-[#3A3A3A] hover:border-[#CEAD41]'
            }`}
            style={{ backgroundColor: isSelected ? 'rgba(206, 173, 65, 0.05)' : 'transparent' }}
              onClick={() => toggleMarket(market.id)}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#CEAD41', fontFamily: 'Italiana, serif', letterSpacing: '0.05em' }}>
                  {market.title}
                </h3>
                <p className="mb-3 text-base" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>{market.description}</p>
                <p className="text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif', opacity: 0.8 }}>{market.details}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Custom Watchlist */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#C6C5C4', fontFamily: 'Italiana, serif' }}>
          Custom Watchlist (Optional)
        </h3>
        <p className="mb-4" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
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
            <p className="text-sm mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>Your custom watchlist:</p>
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

      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#2A2A2A' }}>
        <h4 className="font-semibold mb-2" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>Understanding these markets:</h4>
        <div className="space-y-2 text-sm" style={{ color: '#C6C5C4', fontFamily: 'Aboreto, serif' }}>
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
