export const FONT_FAMILY = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
export interface ThemePreset {
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
// 36 swatches (3 rows of 6) spanning red (0°) through green (120°) to blue (240°)
const PRESET_COUNT     = 18
const PRESET_HUE_RANGE = 240
export const THEME_PRESETS: ThemePreset[] = Array.from({ length: PRESET_COUNT }, (_, i) => ({
  hue: Math.round((i / (PRESET_COUNT - 1)) * PRESET_HUE_RANGE),
}))

export const DEFAULT_HUE        = 205
export const DEFAULT_DARKMODE   = true
export const DEFAULT_SATURATION = 1
export const DEFAULT_LIGHTNESS  = 1

// ─────────────────────────────────────────────────────────────────────────────
// buildColors
// Derives a full color set from a hue value, dark/light flag, and
// saturation/lightness multipliers (1 = neutral, applied proportionally
// to each layer's S and L so relative depth still reads correctly).
// ─────────────────────────────────────────────────────────────────────────────
const clampPct = (v: number) => Math.min(100, Math.max(0, v))

export function buildColors(
  hue: number,
  darkMode: boolean,
  saturation: number = DEFAULT_SATURATION,
  lightness: number = DEFAULT_LIGHTNESS,
): Colors {
  const s = (pct: number) => clampPct(pct * saturation)
  const l = (pct: number) => clampPct(pct * lightness)

  const hsl  = (sat: number, light: number) => `hsl(${hue}, ${s(sat)}%, ${l(light)}%)`
  const hsla = (sat: number, light: number, alpha: number) => `hsla(${hue}, ${s(sat)}%, ${l(light)}%, ${alpha})`

  return {
    side:        hsl(85, 8),
    sideStroke:  hsl(75, 12),
    body:        hsl(90, 18),
    bodyStroke:  hsl(80, 24),
    face:        hsl(88, 25),
    faceStroke:  hsl(75, 32),
    inner:       hsl(85, 32),
    innerStroke: hsl(70, 40),
    icon:        hsl(100, 58),
    iconGlow1:   hsla(100, 55, 0.9),
    iconGlow2:   hsla(100, 50, 0.4),
    logo:        hsl(100, 60),
    logoGlow1:   hsla(100, 55, 0.75),
    logoGlow2:   hsla(100, 50, 0.35),
    connector:   darkMode ? hsl(90, 55) : hsl(88, 25),
    label:       darkMode ? hsl(90, 55) : hsl(88, 25),
    labelHover:  darkMode ? hsl(100, 96) : hsl(90, 8),
    bg:          darkMode ? '#000' : '#eef2f7',
    heading:     darkMode ? '#ffffff' : '#0a1628',
    glow:            hsla(80, 40, 0.12),
    perimeterStroke:  darkMode ? hsl(100, 72) : hsl(100, 50),
    iconHover:        hsl(60, 80),
    iconHoverGlow1:   `hsla(0, 0%, 100%, 0.9)`,
    iconHoverGlow2:   `hsla(0, 0%, 100%, 0.4)`,
    isDark: darkMode,
  }
}
