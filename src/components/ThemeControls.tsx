import React from 'react'
import { THEME_PRESETS } from '../theme.ts'

interface ThemeControlsProps {
  hue:          number
  setHue:       (hue: number) => void
  darkMode:     boolean
  setDarkMode:  (dark: boolean) => void
  onReset:      () => void
  position:     'top' | 'bottom'
}

export default function ThemeControls({
  hue, setHue,
  darkMode, setDarkMode,
  onReset,
  position,
}: ThemeControlsProps) {
  const isTop = position === 'top'

  const dim        = darkMode ? 'rgba(255,255,255,0.4)'  : 'rgba(0,0,0,0.38)'
  const dimHi      = darkMode ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.7)'
  const borderClr  = darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'

  const panelStyle: React.CSSProperties = {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    flexWrap:       'wrap',
    gap:            '24px',
    padding:        isTop ? '0 0 32px' : '32px 0 0',
    userSelect:     'none',
  }

  const groupStyle: React.CSSProperties = {
    display:       'flex',
    flexDirection: 'column',
    alignItems:    'flex-start',
    gap:           '6px',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily:    'system-ui, -apple-system, sans-serif',
    fontSize:      '10px',
    fontWeight:    500,
    letterSpacing: '0.13em',
    textTransform: 'uppercase',
    color:         dim,
  }

  const sliderStyle: React.CSSProperties = {
    WebkitAppearance: 'none' as const,
    appearance:       'none' as const,
    width:            '140px',
    height:           '4px',
    borderRadius:     '2px',
    outline:          'none',
    cursor:           'pointer',
    background: `linear-gradient(to right,
      hsl(0,80%,50%), hsl(45,80%,50%), hsl(90,80%,50%),
      hsl(135,80%,50%), hsl(180,80%,50%), hsl(225,80%,50%),
      hsl(270,80%,50%), hsl(315,80%,50%), hsl(360,80%,50%))`,
  }

  const toggleTrackStyle: React.CSSProperties = {
    width:        '36px',
    height:       '20px',
    borderRadius: '10px',
    background:   darkMode ? `hsl(${hue}, 75%, 38%)` : '#bbb',
    position:     'relative',
    transition:   'background 0.3s',
    flexShrink:   0,
    cursor:       'pointer',
  }

  const toggleKnobStyle: React.CSSProperties = {
    position:     'absolute',
    top:          '3px',
    left:         darkMode ? '19px' : '3px',
    width:        '14px',
    height:       '14px',
    borderRadius: '50%',
    background:   '#fff',
    boxShadow:    '0 1px 3px rgba(0,0,0,0.3)',
    transition:   'left 0.25s cubic-bezier(0.22,1,0.36,1)',
  }

  const resetStyle: React.CSSProperties = {
    fontFamily:    'system-ui, -apple-system, sans-serif',
    fontSize:      '10px',
    fontWeight:    500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    padding:       '5px 14px',
    border:        `1px solid ${borderClr}`,
    borderRadius:  '3px',
    background:    'transparent',
    color:         dim,
    cursor:        'pointer',
    transition:    'color 0.2s, border-color 0.2s',
  }

  const handleResetHover = (e: React.MouseEvent<HTMLButtonElement>, over: boolean) => {
    e.currentTarget.style.color       = over ? dimHi     : dim
    e.currentTarget.style.borderColor = over ? dimHi     : borderClr
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(Number(e.target.value))
  }

  return (
    <div style={panelStyle}>

      {/* Palette presets */}
      <div style={groupStyle}>
        <span style={labelStyle}>Palette</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {THEME_PRESETS.map((preset) => {
            const active = hue === preset.hue
            return (
              <button
                key={preset.hue}
                title={preset.name}
                onClick={() => setHue(preset.hue)}
                style={{
                  width:        '22px',
                  height:       '22px',
                  borderRadius: '50%',
                  background:   `hsl(${preset.hue}, 80%, 45%)`,
                  border:       active ? `2px solid ${dimHi}` : '2px solid transparent',
                  cursor:       'pointer',
                  transform:    active ? 'scale(1.25)' : 'scale(1)',
                  transition:   'transform 0.18s, border 0.18s',
                  padding:      0,
                  outline:      'none',
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Hue slider */}
      <div style={groupStyle}>
        <span style={labelStyle}>Hue — {hue}°</span>
        <input
          type="range"
          min={0}
          max={360}
          value={hue}
          onChange={handleSliderChange}
          style={sliderStyle}
        />
      </div>

      {/* Dark / light toggle */}
      <div style={groupStyle}>
        <span style={labelStyle}>Theme</span>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          onClick={() => setDarkMode(!darkMode)}
        >
          <div style={toggleTrackStyle}>
            <div style={toggleKnobStyle} />
          </div>
          <span style={{ ...labelStyle, letterSpacing: '0.06em' }}>
            {darkMode ? 'Dark' : 'Light'}
          </span>
        </div>
      </div>

      {/* Reset */}
      <div style={groupStyle}>
        <span style={{ ...labelStyle, opacity: 0 }}>·</span>
        <button
          style={resetStyle}
          onClick={onReset}
          onMouseEnter={(e) => handleResetHover(e, true)}
          onMouseLeave={(e) => handleResetHover(e, false)}
        >
          Reset
        </button>
      </div>

    </div>
  )
}
