import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export default function AllocationChart({ tokens, isLoading }) {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (tokens.length === 0) {
      setChartData([])
      return
    }

    const data = tokens.map(token => ({
      name: token.symbol,
      value: token.value,
      color: token.color
    }))
    setChartData(data)
  }, [tokens])

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, payload: data } = payload[0]
      const percentage = ((value / totalValue) * 100).toFixed(1)
      return (
        <div className="bg-slate-900/95 border border-cyan-500/30 rounded-lg p-3 backdrop-blur">
          <p className="text-cyan-300 font-semibold text-sm">{name}</p>
          <p className="text-slate-300 text-sm font-mono">${value.toFixed(2)}</p>
          <p className="text-slate-400 text-xs mt-1">{percentage}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="glass rounded-2xl p-8 shadow-2xl h-full min-h-96 flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-50">Portfolio Allocation</h3>
        <p className="text-slate-400 text-sm mt-1">Token distribution by value</p>
      </div>

      {isLoading || chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-slate-400">Loading allocation...</div>
        </div>
      ) : (
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                animationDuration={800}
                animationBegin={0}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span className="text-slate-300 text-sm">
                    {entry.payload.name} • ${entry.payload.value.toFixed(0)}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}