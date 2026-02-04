import React, { useState, useEffect } from 'react'
import PortfolioSummary from './components/PortfolioSummary'
import ChainFilter from './components/ChainFilter'
import AllocationChart from './components/AllocationChart'
import HoldingsTable from './components/HoldingsTable'
import TransactionHistory from './components/TransactionHistory'
import { mockTokens, mockTransactions } from './data/mockData'

export default function App() {
  const [selectedChain, setSelectedChain] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 300)
  }, [])

  const filteredTokens = selectedChain === 'all' 
    ? mockTokens 
    : mockTokens.filter(t => t.chain === selectedChain)

  const totalValue = filteredTokens.reduce((sum, t) => sum + t.value, 0)
  const change24h = filteredTokens.reduce((sum, t) => sum + ((t.change24h / 100) * t.value), 0)

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Animated gradient orb background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className={`mb-10 ${!isLoading ? 'animate-slide-up' : 'opacity-0'}`}>
            <h1 className="text-4xl font-bold text-slate-50 mb-2">Cumy Wallet Tracker</h1>
            <p className="text-slate-400">Multi-chain portfolio overview</p>
          </div>

          {/* Portfolio Summary */}
          <PortfolioSummary 
            totalValue={totalValue} 
            change24h={change24h}
            isLoading={isLoading}
          />

          {/* Chain Filter */}
          <ChainFilter 
            selectedChain={selectedChain}
            onSelectChain={setSelectedChain}
            isLoading={isLoading}
          />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left: Allocation Chart */}
            <div className={`lg:col-span-1 ${!isLoading ? 'animate-slide-up-stagger-1' : 'opacity-0'}`}>
              <AllocationChart tokens={filteredTokens} isLoading={isLoading} />
            </div>

            {/* Right: Holdings Table */}
            <div className={`lg:col-span-2 ${!isLoading ? 'animate-slide-up-stagger-2' : 'opacity-0'}`}>
              <HoldingsTable tokens={filteredTokens} isLoading={isLoading} />
            </div>
          </div>

          {/* Transaction History */}
          <div className={`mt-8 ${!isLoading ? 'animate-slide-up-stagger-3' : 'opacity-0'}`}>
            <TransactionHistory transactions={mockTransactions} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  )
}