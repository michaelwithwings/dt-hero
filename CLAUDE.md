# dt-hero — Claude Code Project Brief

## Project Overview

A React/Vite/TypeScript landing page for DirectTransact, featuring an animated isometric SVG stage showcasing a financial services product suite. Deployed on Vercel.

## Tech Stack

- React 18, TypeScript, Vite
- Pure CSS-in-JS (inline styles, no CSS framework)
- SVG-based isometric illustration
- Yarn package manager

## File Structure

- `src/theme.ts` — color system, `buildColors(hue, darkMode)`, 6 presets
- `src/tileData.ts` — tile metadata (labels, positions, sides)
- `src/components/HeroSection.tsx` — root, holds hue/darkMode state
- `src/components/IsometricStage.tsx` — float animations, entrance animations
- `src/components/TopElement.tsx` — 4-tile isometric SVG (Payments, Banking, Card, Recon & Settlement)
- `src/components/BottomElement.tsx` — single tile SVG (Digital Identity)
- `src/components/TileLabel.tsx` — connector label with hover state
- `src/components/LineCircle.tsx` — SVG connector line + dot

## Branches

- `main` — production, auto-deploys to Vercel on merge
- `dev` — active development branch, always work here

## Code Style

- Inline styles only (React.CSSProperties), no CSS classes
- Keyframe animations defined inside `<style>` tags within components
- Colors always sourced from the `colors` prop (never hardcoded)
- TypeScript strict mode

## Current State

- Isometric stage with entrance animation and continuous float loop
- Ambient perimeter stroke-draw animation on the 4-tile group (every ~14s)
- Hover states on all tiles: glow effect + inner face stroke-draw trace on label hover
- Theme controls (hue slider, dark/light toggle, presets) — visible on page, to be moved to a hidden drawer/modal
- Responsive mobile layout in progress

## Pending Work

- Responsive mobile layout (below 600px: simplified labels, no LineCircle connectors)
- Theme controls: move to a hidden drawer or draggable modal (keep accessible but out of the way)
- Click handlers on tiles linking to product pages (deferred)
