import React from 'react'
import { Send, ArrowDownLeft, ArrowUpRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function TransactionHistory({ transactions, isLoading }) {
  const [copiedId, setCopiedId] = useState(null)

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatTime = (date) => {
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  return (
    <div className="glass rounded-2xl p-8 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-50">Recent Transactions</h3>
        <p className="text-slate-400 text-sm mt-1">Latest activity across all chains</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="py-12 text-center text-slate-400">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="py-12 text-center text-slate-400">No transactions found</div>
        ) : (
          transactions.map((tx, idx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/30 hover:bg-slate-800/50 transition-all duration-300 group"
              style={{
                animation: isLoading ? 'none' : `slideUpFadeStagger 0.6s ease-out ${0.15 + idx * 0.1}s forwards`,
                opacity: isLoading ? 0 : 1
              }}
            >
              {/* Left: Icon + Info */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  tx.type === 'send'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {tx.type === 'send' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-slate-50">
                      {tx.type === 'send' ? 'Sent' : 'Received'} {tx.token}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      tx.type === 'send'
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {tx.type === 'send' ? 'Out' : 'In'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="truncate max-w-xs">
                      {tx.type === 'send' ? 'To' : 'From'}: {truncateAddress(tx.type === 'send' ? tx.to : tx.from)}
                    </span>
                    <button
                      onClick={() => copyToClipboard(tx.type === 'send' ? tx.to : tx.from, `copy-${tx.id}`)}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-700/50 rounded"
                      title="Copy address"
                    >
                      {copiedId === `copy-${tx.id}` ? (
                        <Check size={14} className="text-emerald-400" />
                      ) : (
                        <Copy size={14} className="text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Amount + Time */}
              <div className="flex items-center gap-6 text-right flex-shrink-0 ml-4">
                <div>
                  <p className="font-mono-wallet font-semibold text-slate-50">
                    {tx.type === 'send' ? '-' : '+'}{tx.amount.toFixed(4)} {tx.token}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{formatTime(tx.timestamp)}</p>
                </div>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  tx.status === 'completed' ? 'bg-emerald-400' : 'bg-yellow-400'
                }`}></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}