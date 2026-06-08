import React, { useState, useEffect } from "react";
import { THEME_PRESETS, FONT_FAMILY } from "../theme.ts";

const MOBILE_BREAKPOINT = 600;

function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT,
  );
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return mobile;
}

function ScreenSize({ color, fontSize }: { color: string; fontSize: string }) {
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });
  useEffect(() => {
    const onResize = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontSize,
        fontWeight: 500,
        letterSpacing: "0.1em",
        color,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {size.w} × {size.h}
    </span>
  );
}

interface ThemeControlsProps {
  hue: number;
  setHue: (hue: number) => void;
  saturation: number;
  setSaturation: (saturation: number) => void;
  lightness: number;
  setLightness: (lightness: number) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onReset: () => void;
  canReset: boolean;
  position: "top" | "bottom";
}

export default function ThemeControls({
  hue,
  setHue,
  saturation,
  setSaturation,
  lightness,
  setLightness,
  darkMode,
  setDarkMode,
  onReset,
  canReset,
  position,
}: ThemeControlsProps) {
  const isTop = position === "top";
  const mobile = useIsMobile();

  const dim = darkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.38)";
  const dimHi = darkMode ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.7)";

  const panelStyle: React.CSSProperties = mobile
    ? {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "24px",
        padding: isTop ? "0 0 32px" : "4px 0 0",
        userSelect: "none",
        border: `1px solid hsl(${hue}, 80%, 45%)`,
        borderRadius: "6px",
      }
    : {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "auto auto",
        columnGap: "24px",
        rowGap: "20px",
        padding: isTop ? "24px 24px 32px" : "32px 24px 12px",
        userSelect: "none",
        border: `1px solid hsl(${hue}, 80%, 45%)`,
        borderRadius: "6px",
        maxWidth: "600px",
        margin: "0 auto",
      };

  const groupStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "6px",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: mobile ? "12px" : "10px",
    fontWeight: 500,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color: mobile ? dimHi : dim,
  };

  const sliderStyle: React.CSSProperties = {
    WebkitAppearance: "none" as const,
    appearance: "none" as const,
    width: mobile ? "242px" : "140px",
    height: mobile ? "9px" : "4px",
    borderRadius: mobile ? "4px" : "2px",
    outline: "none",
    cursor: "pointer",
    background: `linear-gradient(to right,
      hsl(0,80%,50%), hsl(45,80%,50%), hsl(90,80%,50%),
      hsl(135,80%,50%), hsl(180,80%,50%), hsl(225,80%,50%),
      hsl(270,80%,50%), hsl(315,80%,50%), hsl(360,80%,50%))`,
  };

  const trackW = mobile ? 52 : 36;
  const trackH = mobile ? 28 : 20;
  const knobD = mobile ? 20 : 14;
  const knobInset = mobile ? 4 : 3;
  const knobOffset = trackW - knobD - knobInset;

  const toggleTrackStyle: React.CSSProperties = {
    width: `${trackW}px`,
    height: `${trackH}px`,
    borderRadius: `${trackH / 2}px`,
    background: darkMode ? `hsl(${hue}, 75%, 38%)` : "#bbb",
    position: "relative",
    transition: "background 0.3s",
    flexShrink: 0,
    cursor: "pointer",
  };

  const toggleKnobStyle: React.CSSProperties = {
    position: "absolute",
    top: `${knobInset}px`,
    left: darkMode ? `${knobOffset}px` : `${knobInset}px`,
    width: `${knobD}px`,
    height: `${knobD}px`,
    borderRadius: "50%",
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
    transition: "left 0.25s cubic-bezier(0.22,1,0.36,1)",
  };

  const resetStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: mobile ? "13px" : "12px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "none",
    padding: mobile ? "10px 22px" : "9px 20px",
    marginTop: mobile ? "20px" : "0",
    border: "none",
    borderRadius: "8px",
    background: canReset
      ? `hsl(${hue}, 80%, 50%)`
      : darkMode
        ? "rgba(255,255,255,0.12)"
        : "rgba(0,0,0,0.12)",
    color: canReset ? "#fff" : dim,
    cursor: canReset ? "pointer" : "default",
    opacity: canReset ? 1 : 0.6,
    transition: "background 0.2s, opacity 0.2s",
  };

  const handleResetHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    over: boolean,
  ) => {
    if (!canReset) return;
    e.currentTarget.style.background = over
      ? "#6b7280"
      : `hsl(${hue}, 80%, 50%)`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(Number(e.target.value));
  };

  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaturation(Number(e.target.value) / 100);
  };

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLightness(Number(e.target.value) / 100);
  };

  const plainSliderStyle: React.CSSProperties = {
    ...sliderStyle,
    background: darkMode ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)",
  };

  return (
    <div style={panelStyle}>
      {/* Palette presets — 3 rows of 8 swatches spanning the full hue wheel */}
      <div
        style={
          mobile
            ? groupStyle
            : {
                ...groupStyle,
                gridColumn: "1",
                gridRow: "1",
                alignItems: "center",
              }
        }
      >
        <span style={labelStyle}>Palette</span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(8, ${mobile ? "24px" : "17px"})`,
            gap: mobile ? "8px" : "5px",
          }}
        >
          {THEME_PRESETS.map((preset) => {
            const active = hue === preset.hue;
            return (
              <button
                key={preset.hue}
                onClick={() => setHue(preset.hue)}
                style={{
                  width: mobile ? "24px" : "17px",
                  height: mobile ? "24px" : "17px",
                  borderRadius: "50%",
                  background: `hsl(${preset.hue}, 80%, 45%)`,
                  border: active
                    ? `2px solid ${dimHi}`
                    : "2px solid transparent",
                  cursor: "pointer",
                  transform: active ? "scale(1.25)" : "scale(1)",
                  transition: "transform 0.18s, border 0.18s",
                  padding: 0,
                  outline: "none",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Hue / Saturation / Lightness sliders, stacked vertically */}
      <div
        style={
          mobile
            ? { ...groupStyle, gap: "14px" }
            : {
                ...groupStyle,
                gap: "14px",
                gridColumn: "2",
                gridRow: "1",
                alignItems: "center",
              }
        }
      >
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

        <div style={groupStyle}>
          <span style={labelStyle}>
            Saturation — {Math.round(saturation * 100)}%
          </span>
          <input
            type="range"
            min={0}
            max={150}
            value={Math.round(saturation * 100)}
            onChange={handleSaturationChange}
            style={plainSliderStyle}
          />
        </div>

        <div style={groupStyle}>
          <span style={labelStyle}>
            Lightness — {Math.round(lightness * 100)}%
          </span>
          <input
            type="range"
            min={0}
            max={150}
            value={Math.round(lightness * 100)}
            onChange={handleLightnessChange}
            style={plainSliderStyle}
          />
        </div>
      </div>

      {/* Dark / light toggle */}
      {!mobile && (
        <div
          style={{
            ...groupStyle,
            gridColumn: "3",
            gridRow: "1",
            alignItems: "center",
          }}
        >
          <span style={labelStyle}>Theme</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div style={toggleTrackStyle}>
              <div style={toggleKnobStyle} />
            </div>
            <span style={{ ...labelStyle, letterSpacing: "0.06em" }}>
              {darkMode ? "Light" : "Dark"}
            </span>
          </div>
        </div>
      )}

      {/* Reset + screen size (+ theme toggle on mobile) */}
      <div
        style={
          mobile
            ? groupStyle
            : {
                gridColumn: "1 / span 3",
                gridRow: "2",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: "6px",
                borderTop: `1px solid hsl(${hue}, 80%, 45%)`,
                paddingTop: "10px",
              }
        }
      >
        {mobile && <span style={{ ...labelStyle, opacity: 0 }}>·</span>}
        <div
          style={{
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            alignItems: mobile ? "center" : "center",
            justifyContent: mobile ? "center" : "space-between",
            width: mobile ? "100%" : undefined,
            gap: "12px",
          }}
        >
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: mobile ? "16px" : "12px",
            }}
          > */}
          {mobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
              onClick={() => setDarkMode(!darkMode)}
            >
              <div style={toggleTrackStyle}>
                <div style={toggleKnobStyle} />
              </div>
              <span
                style={{
                  ...labelStyle,
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: dimHi,
                }}
              >
                {darkMode ? "Light" : "Dark"}
              </span>
            </div>
          )}
          {!mobile && <ScreenSize color={dim} fontSize="10px" />}
          <button
            style={resetStyle}
            onClick={onReset}
            disabled={!canReset}
            onMouseEnter={(e) => handleResetHover(e, true)}
            onMouseLeave={(e) => handleResetHover(e, false)}
          >
            Reset
          </button>
          {/* </div> */}
          {mobile && (
            <div style={{ paddingTop: "20px", paddingBottom: "24px" }}>
              <ScreenSize color={dimHi} fontSize="14px" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
