import React from 'react'
import { chainInfo } from '../data/mockData'

export default function ChainFilter({ selectedChain, onSelectChain, isLoading }) {
  const chains = [
    { id: 'all', name: 'All Chains', icon: '🔗' },
    { id: 'ethereum', name: 'Ethereum', icon: '⟠' },
    { id: 'solana', name: 'Solana', icon: '◎' },
    { id: 'bsc', name: 'BSC', icon: '⬠' }
  ]

  return (
    <div className={`flex gap-3 overflow-x-auto pb-2 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
      {chains.map((chain) => (
        <button
          key={chain.id}
          onClick={() => onSelectChain(chain.id)}
          disabled={isLoading}
          className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
            selectedChain === chain.id
              ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50 hover:text-slate-200'
          }`}
        >
          <span className="mr-2">{chain.icon}</span>
          {chain.name}
        </button>
      ))}
    </div>
  )
}