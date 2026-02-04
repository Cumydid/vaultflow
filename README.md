# Cumy Wallet Tracker

Premium cryptocurrency portfolio management dashboard with support for Ethereum, Solana, and BSC.

## Features

- **Portfolio Summary** — Animated total value and 24h P&L with real-time calculations
- **Multi-Chain Support** — Filter holdings by Ethereum, Solana, or BSC
- **Token Allocation** — Interactive donut chart visualization of portfolio distribution
- **Holdings Table** — Detailed token data with sortable columns (price, 24h change, value)
- **Transaction History** — Send/receive activity with truncated addresses and relative timestamps
- **Premium UI** — Glassmorphic design with backdrop-blur, dark editorial aesthetic, teal accent color
- **Animations** — Staggered fade-in on load, smooth value transitions, hover effects

## Framework

Vite + React 19

## Theme

Dark Editorial Fintech — Sophisticated charcoal backgrounds (#0f172a), off-white text, electric teal accents (#06b6d4), with glassmorphic cards and subtle backdrop-blur for depth. Typography pairs Inter (headers/body) with JetBrains Mono (numerical data) for distinctive, premium fintech aesthetic.

## Preview

Configured to run on `0.0.0.0:8080` for k8s HTTPRoute access. The system handles installation and startup automatically.

## Design Highlights

- **Glassmorphism** — Semi-transparent cards with backdrop-blur and soft borders
- **Distinctive Typography** — JetBrains Mono for wallet values and balances
- **Single Strong Accent** — Teal (#06b6d4) used consistently for active states, gains, and CTAs
- **Intentional Spacing** — Generous padding, clear visual hierarchy, ample whitespace
- **Subtle Motion** — Staggered animations on component mount, smooth transitions on value updates
- **Accessibility** — Proper contrast ratios, semantic HTML, keyboard navigation support