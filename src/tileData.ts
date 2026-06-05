// src/tileData.ts

export type Side = "left" | "right";

export interface GradientStop {
  offset: number; // 0–1
  opacity: number; // 0–1
}

export interface TopTileMeta {
  id: string;
  label: string;
  side: Side;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  lx: number;
  ly: number;
  lineWidth: number;
  gradientStops: GradientStop[];
}

export interface BottomTileMeta {
  id: string;
  label: string;
  side: Side;
  lx: number;
  ly: number;
  lineWidth: number;
  gradientStops: GradientStop[];
}

// Long stems (Card 160px):
//   transparent for most of the stem, eases in sharply near the dot.
const LONG_GRADIENT: GradientStop[] = [
  { offset: 0, opacity: 0 },
  { offset: 0.25, opacity: 0 },
  { offset: 0.4, opacity: 1 },
  { offset: 1, opacity: 1 },
];

// Long stems (Banking 140px):
//   transparent for most of the stem, eases in sharply near the dot.
const LONG_GRADIENT_02: GradientStop[] = [
  { offset: 0, opacity: 0 },
  { offset: 0.02, opacity: 0 },
  { offset: 0.2, opacity: 1 },
  { offset: 1, opacity: 1 },
];

// Short stems (Payments 80px, Recon & Settlement 80px):
//   tighter fade — noticeable transition across the shorter length.
const SHORT_GRADIENT: GradientStop[] = [
  { offset: 0, opacity: 0 },
  { offset: 0.57, opacity: 0 },
  { offset: 0.72, opacity: 1 },
  { offset: 1, opacity: 1 },
];

// Medium stem (Digital Identity 100px):
//   balanced between long and short.
const MEDIUM_GRADIENT: GradientStop[] = [
  { offset: 0, opacity: 0 },
  { offset: 0.68, opacity: 0 },
  { offset: 0.83, opacity: 1 },
  { offset: 1, opacity: 1 },
];

export const TOP_TILES: TopTileMeta[] = [
  {
    id: "top-left",
    label: "Payments",
    side: "left",
    cx: 24,
    cy: 35,
    rx: 22,
    ry: 14,
    lx: 80,
    ly: 92,
    lineWidth: 80,
    gradientStops: SHORT_GRADIENT,
  },
  {
    id: "bottom",
    label: "Banking",
    side: "left",
    cx: 50,
    cy: 64,
    rx: 22,
    ry: 14,
    lx: 189,
    ly: 159,
    lineWidth: 140,
    gradientStops: LONG_GRADIENT_02,
  },
  {
    id: "top-center",
    label: "Card",
    side: "right",
    cx: 50,
    cy: 13,
    rx: 22,
    ry: 14,
    lx: 250,
    ly: 18,
    lineWidth: 160,
    gradientStops: LONG_GRADIENT,
  },
  {
    id: "top-right",
    label: "Recon & Settlement",
    side: "right",
    cx: 76,
    cy: 35,
    rx: 22,
    ry: 14,
    lx: 394,
    ly: 92,
    lineWidth: 80,
    gradientStops: SHORT_GRADIENT,
  },
];

export const BOTTOM_TILE: BottomTileMeta = {
  id: "digital-identity",
  label: "Digital Identity",
  side: "right",
  lx: 358,
  ly: 90,
  lineWidth: 100,
  gradientStops: MEDIUM_GRADIENT,
};
