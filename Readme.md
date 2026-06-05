# DT – Product & Service Suite

Interactive isometric hero section built with React + TypeScript + Vite.

## Stack

- React 18
- TypeScript 5
- Vite 5
- Pure SVG — no canvas, no external animation libraries

## Project structure

```
src/
├── components/
│   ├── HeroSection.tsx      # Page shell, theme state
│   ├── IsometricStage.tsx   # Layout of top + bottom tile elements
│   ├── TopElement.tsx       # 4-tile isometric cluster
│   ├── BottomElement.tsx    # Single bottom tile
│   ├── TileLabel.tsx        # Label + LineCircle connector
│   ├── LineCircle.tsx       # Gradient stem + dot SVG
│   └── ThemeControls.tsx    # Hue slider, palette presets, dark/light toggle
├── tileData.ts              # Tile positions, labels, gradient configs
├── theme.ts                 # Color derivation from hue + dark/light
├── index.css
└── main.tsx
```

## Development

```bash
yarn install
yarn dev
```

## Build

```bash
yarn build
yarn preview
```
