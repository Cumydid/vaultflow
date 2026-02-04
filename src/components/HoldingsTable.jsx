import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function HoldingsTable({ tokens, isLoading }) {
  const [sortConfig, setSortConfig] = useState({ key: 'value', direction: 'desc' })
  const [displayTokens, setDisplayTokens] = useState([])

  useEffect(() => {
    let sorted = [...tokens]
    
    if (sortConfig.key === 'change24h') {
      sorted.sort((a, b) => 
        sortConfig.direction === 'asc' 
          ? a.change24h - b.change24h 
          : b.change24h - a.change24h
      )
    } else if (sortConfig.key === 'value') {
      sorted.sort((a, b) => 
        sortConfig.direction === 'asc' 
          ? a.value - b.value 
          : b.value - a.value
      )
    }

    setDisplayTokens(sorted)
  }, [tokens, sortConfig])

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }))
  }

  const SortHeader = ({ label, sortKey }) => (
    <button
      onClick={() => handleSort(sortKey)}
      className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
    >
      {label}
      {sortConfig.key === sortKey && (
        <span className="text-xs">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
      )}
    </button>
  )

  return (
    <div className="glass rounded-2xl p-8 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-50">Holdings</h3>
        <p className="text-slate-400 text-sm mt-1">{tokens.length} assets</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="px-4 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Token</th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Balance</th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Price</th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer">
                <SortHeader label="24h %" sortKey="change24h" />
              </th>
              <th className="px-4 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer">
                <SortHeader label="Value" sortKey="value" />
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-4 py-12 text-center text-slate-400">Loading...</td>
              </tr>
            ) : displayTokens.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-12 text-center text-slate-400">No holdings found</td>
              </tr>
            ) : (
              displayTokens.map((token, idx) => (
                <tr
                  key={token.id}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors duration-200 group"
                  style={{
                    animation: isLoading ? 'none' : `slideUpFadeStagger 0.6s ease-out ${0.1 + idx * 0.08}s forwards`,
                    opacity: isLoading ? 0 : 1
                  }}
                >
                  {/* Token Name */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-lg font-bold group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-shadow">
                        {token.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-50">{token.name}</p>
                        <p className="text-xs text-slate-500">{token.symbol}</p>
                      </div>
                    </div>
                  </td>

                  {/* Balance */}
                  <td className="px-4 py-4 text-right">
                    <p className="font-mono-wallet text-slate-300 font-semibold">{token.balance.toFixed(4)}</p>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-4 text-right">
                    <p className="font-mono-wallet text-slate-300 font-semibold">${token.price.toFixed(2)}</p>
                  </td>

                  {/* 24h Change */}
                  <td className="px-4 py-4 text-right">
                    <div className={`flex items-center justify-end gap-1 font-semibold ${token.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {token.change24h >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span className="font-mono-wallet">{token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%</span>
                    </div>
                  </td>

                  {/* Value */}
                  <td className="px-4 py-4 text-right">
                    <p className="font-mono-wallet text-cyan-300 font-bold">${token.value.toFixed(2)}</p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}