export const FONT_FAMILY = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
export interface ThemePreset {
  name: string
  hue: number
}

export interface Colors {
  side: string
  sideStroke: string
  body: string
  bodyStroke: string
  face: string
  faceStroke: string
  inner: string
  innerStroke: string
  icon: string
  iconGlow1: string
  iconGlow2: string
  logo: string
  logoGlow1: string
  logoGlow2: string
  connector: string
  label: string
  labelHover: string
  bg: string
  heading: string
  glow: string
  perimeterStroke: string
  iconHover: string
  iconHoverGlow1: string
  iconHoverGlow2: string
  isDark: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// PRESETS
// ─────────────────────────────────────────────────────────────────────────────
export const THEME_PRESETS: ThemePreset[] = [
  { name: 'Ocean',   hue: 205 },
  { name: 'Teal',    hue: 175 },
  { name: 'Indigo',  hue: 240 },
  { name: 'Violet',  hue: 270 },
  { name: 'Emerald', hue: 155 },
  { name: 'Amber',   hue: 35  },
]

export const DEFAULT_HUE      = THEME_PRESETS[0].hue
export const DEFAULT_DARKMODE  = true

// ─────────────────────────────────────────────────────────────────────────────
// buildColors
// Derives a full color set from a single hue value and dark/light flag.
// All SVG layer colors maintain their relative lightness so 3D depth
// reads correctly at any hue.
// ─────────────────────────────────────────────────────────────────────────────
export function buildColors(hue: number, darkMode: boolean): Colors {
  return {
    side:        `hsl(${hue}, 85%, 8%)`,
    sideStroke:  `hsl(${hue}, 75%, 12%)`,
    body:        `hsl(${hue}, 90%, 18%)`,
    bodyStroke:  `hsl(${hue}, 80%, 24%)`,
    face:        `hsl(${hue}, 88%, 25%)`,
    faceStroke:  `hsl(${hue}, 75%, 32%)`,
    inner:       `hsl(${hue}, 85%, 32%)`,
    innerStroke: `hsl(${hue}, 70%, 40%)`,
    icon:        `hsl(${hue}, 100%, 58%)`,
    iconGlow1:   `hsla(${hue}, 100%, 55%, 0.9)`,
    iconGlow2:   `hsla(${hue}, 100%, 50%, 0.4)`,
    logo:        `hsl(${hue}, 100%, 60%)`,
    logoGlow1:   `hsla(${hue}, 100%, 55%, 0.75)`,
    logoGlow2:   `hsla(${hue}, 100%, 50%, 0.35)`,
    connector:   darkMode ? `hsl(${hue}, 90%, 55%)` : `hsl(${hue}, 88%, 25%)`,
    label:       darkMode ? `hsl(${hue}, 90%, 55%)` : `hsl(${hue}, 88%, 25%)`,
    labelHover:  darkMode ? `hsl(${hue}, 100%, 96%)` : `hsl(${hue}, 90%, 8%)`,
    bg:          darkMode ? '#000' : '#eef2f7',
    heading:     darkMode ? '#ffffff' : '#0a1628',
    glow:            `hsla(${hue}, 80%, 40%, 0.12)`,
    perimeterStroke:  darkMode ? `hsl(${hue}, 100%, 72%)` : `hsl(${hue}, 100%, 50%)`,
    iconHover:        `hsl(${hue}, 60%, 80%)`,
    iconHoverGlow1:   `hsla(0, 0%, 100%, 0.9)`,
    iconHoverGlow2:   `hsla(0, 0%, 100%, 0.4)`,
    isDark: darkMode,
  }
}
