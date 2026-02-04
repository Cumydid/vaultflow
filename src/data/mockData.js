export const mockTokens = [
  {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '⟠',
    chain: 'ethereum',
    balance: 2.5,
    price: 2450.75,
    change24h: 3.24,
    value: 6126.88,
    color: '#627eea'
  },
  {
    id: 2,
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    chain: 'ethereum',
    balance: 0.15,
    price: 42850.00,
    change24h: 2.15,
    value: 6427.50,
    color: '#f7931a'
  },
  {
    id: 3,
    name: 'Solana',
    symbol: 'SOL',
    icon: '◎',
    chain: 'solana',
    balance: 45.5,
    price: 98.30,
    change24h: -1.54,
    value: 4472.65,
    color: '#14f195'
  },
  {
    id: 4,
    name: 'USDC',
    symbol: 'USDC',
    icon: 'U',
    chain: 'ethereum',
    balance: 5000,
    price: 1.00,
    change24h: 0.02,
    value: 5000,
    color: '#2775ca'
  },
  {
    id: 5,
    name: 'Binance Coin',
    symbol: 'BNB',
    icon: '⬠',
    chain: 'bsc',
    balance: 12.3,
    price: 615.45,
    change24h: 1.87,
    value: 7570.04,
    color: '#f3ba2f'
  },
  {
    id: 6,
    name: 'Lido',
    symbol: 'LIDO',
    icon: '⟳',
    chain: 'ethereum',
    balance: 180,
    price: 3.45,
    change24h: 4.12,
    value: 621,
    color: '#48a0f7'
  }
]

export const mockTransactions = [
  {
    id: 1,
    type: 'send',
    token: 'ETH',
    amount: 0.5,
    from: '0x742d35Cc6634C0532925a3b844Bc9e7595f42bbE',
    to: '0x8ba1f1f109Ac209f0e2E4C1a3b7b8c3d5E6F7gHI',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'completed'
  },
  {
    id: 2,
    type: 'receive',
    token: 'BTC',
    amount: 0.08,
    from: '0x9cA2b5f1a3d8E6F5c1B4aD7e2F9b8C3d5E6F7gHI',
    to: '0x742d35Cc6634C0532925a3b844Bc9e7595f42bbE',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    status: 'completed'
  },
  {
    id: 3,
    type: 'send',
    token: 'SOL',
    amount: 10,
    from: '0x742d35Cc6634C0532925a3b844Bc9e7595f42bbE',
    to: '0x1aB2cD3eF4g5H6i7J8k9L0m1nOpqR2stUvWxYzAbCd',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: 'completed'
  },
  {
    id: 4,
    type: 'receive',
    token: 'USDC',
    amount: 500,
    from: '0x2bB3dE4Ff5g6H7i8J9k0L1m2nOpqR3stUvWxYzAbCd',
    to: '0x742d35Cc6634C0532925a3b844Bc9e7595f42bbE',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'completed'
  },
  {
    id: 5,
    type: 'send',
    token: 'BNB',
    amount: 2.5,
    from: '0x742d35Cc6634C0532925a3b844Bc9e7595f42bbE',
    to: '0x3cC4eF5Gg6h7I8j9K0l1M2n3OpqR4stUvWxYzAbCd',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'completed'
  }
]

export const chainInfo = {
  ethereum: { name: 'Ethereum', icon: '⟠', color: '#627eea' },
  solana: { name: 'Solana', icon: '◎', color: '#14f195' },
  bsc: { name: 'BSC', icon: '⬠', color: '#f3ba2f' }
}