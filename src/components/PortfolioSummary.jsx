import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function PortfolioSummary({ totalValue, change24h, isLoading }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [displayChange, setDisplayChange] = useState(0)

  useEffect(() => {
    if (isLoading) return

    let valueFrame = 0
    let changeFrame = 0
    const steps = 30

    const valueInterval = setInterval(() => {
      valueFrame++
      const progress = valueFrame / steps
      setDisplayValue(totalValue * progress)
      if (valueFrame >= steps) clearInterval(valueInterval)
    }, 10)

    const changeInterval = setInterval(() => {
      changeFrame++
      const progress = changeFrame / steps
      setDisplayChange(change24h * progress)
      if (changeFrame >= steps) clearInterval(changeInterval)
    }, 10)

    return () => {
      clearInterval(valueInterval)
      clearInterval(changeInterval)
    }
  }, [totalValue, change24h, isLoading])

  const isPositive = change24h >= 0
  const changePercent = ((change24h / totalValue) * 100).toFixed(2)

  return (
    <div className="glass rounded-2xl p-8 mb-8 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Portfolio Value */}
        <div className="space-y-3">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Portfolio Value</p>
          <div className="font-mono-wallet">
            <h2 className="text-5xl font-bold text-slate-50 tracking-tight">
              ${isLoading ? '0.00' : displayValue.toFixed(2)}
            </h2>
          </div>
        </div>

        {/* 24h P&L */}
        <div className="space-y-3">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">24h Change</p>
          <div className="flex items-baseline gap-3">
            <div className={`font-mono-wallet text-4xl font-bold flex items-center gap-2 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp size={28} /> : <TrendingDown size={28} />}
              <span className="tracking-tight">
                {isLoading ? '$0.00' : (isPositive ? '+' : '') + displayChange.toFixed(2)}
              </span>
            </div>
            <span className={`text-lg font-semibold tracking-tight ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isLoading ? '0.00%' : (isPositive ? '+' : '') + changePercent + '%'}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 pt-8 border-t border-slate-700/50 flex items-center justify-between">
        <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Multi-chain Portfolio</p>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
          <p className="text-xs text-slate-500">Live</p>
        </div>
      </div>
    </div>
  )
}