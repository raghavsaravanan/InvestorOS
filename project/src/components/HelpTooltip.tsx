import React, { useState } from 'react'

interface HelpTooltipProps {
  term: string
  explanation: string
  examples?: string[]
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({ term, explanation, examples }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="text-indigo-600 hover:text-indigo-800 font-medium underline decoration-dotted"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {term}
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-80 p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="text-sm">
            <h4 className="font-semibold text-gray-900 mb-2">{term}</h4>
            <p className="text-gray-700 mb-3">{explanation}</p>
            {examples && examples.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 mb-1">Examples:</h5>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="absolute -top-1 left-4 w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
        </div>
      )}
    </div>
  )
}

export default HelpTooltip
