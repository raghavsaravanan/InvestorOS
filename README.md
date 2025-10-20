# InvestorOS
aaaa
A premium trading platform featuring institutional-grade tools for modern investors.

## Features

### Oracle
An intelligent assistant for trading decisions with AI-driven market analysis that delivers clear, actionable insights in real time. (Coming Soon)

### Legion
A suite of quantitative trading systems featuring:
- Demand Zone Analyzer - Advanced technical analysis tool for identifying high-probability demand zones
- Additional algorithmic strategies (Coming Soon)

### Sentinel
Intelligent portfolio oversight with real-time monitoring, risk analysis, and optimization guidance. (Coming Soon)

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React (icons)

## Design System

### Typography
- Display Font: Italiana (headings, titles)
- Body Font: Aboreto (paragraphs, UI elements)

### Color Palette
- Background: `#261E1E` (deep brown)
- Accent Gold: `#CEAD41`
- Bronze: `#CD853F`
- Title Gold: `#b08d57`
- Cream Text: `#e6d7c3`

### Motion
- Cubic Bezier: `(0.25, 0.46, 0.45, 0.94)`
- Synchronized animations using Intersection Observer
- Premium load-in effects

## Project Structure

```
src/
├── pages/
│   ├── Home.tsx                    # Landing page
│   ├── Legion.tsx                  # Tools hub with gallery
│   └── demand-zone-analyzer/
│       ├── DemandZoneAnalyzer.tsx  # Analysis tool page
│       └── DemandZoneAnalyzer.module.css
├── styles/
│   ├── index.module.css            # Home page styles
│   └── legion.module.css           # Legion page styles
├── App.tsx                         # Router setup
└── index.css                       # Global styles

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Key Features

### Synchronized Animations
All page sections use Intersection Observer to trigger animations when elements enter the viewport, creating a synchronized, premium feel.

### Responsive Design
- Desktop: Full-featured experience with horizontal gallery
- Tablet: Optimized layouts with adjusted breakpoints
- Mobile: Single-column layouts with touch-friendly interactions

### Navigation
- Sticky navigation with hide-on-scroll behavior
- Hover to reveal when scrolled
- Active section highlighting with scroll spy
- Smooth scroll transitions

### Gallery
The Legion page features a horizontally draggable image gallery with:
- Mouse drag support
- Touch gesture support
- Wheel scroll support
- Smooth parallax-like animations

## Browser Support

Modern browsers supporting ES6+ and CSS Grid:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
