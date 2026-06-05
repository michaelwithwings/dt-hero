// src/components/IsometricStage.tsx
import React, { useState, useEffect, useRef } from "react";
import TopElement from "./TopElement.tsx";
import BottomElement from "./BottomElement.tsx";
import { TOP_TILES, BOTTOM_TILE } from "../tileData.ts";
import type { Colors } from "../theme.ts";

const MOBILE_BREAKPOINT = 900;

// ── Layout knobs ─────────────────────────────────────────────────────────────
const MOBILE_MAX_W = 440; // px — max tile width on mobile
const MOBILE_OVERLAP = 16; // % — how much bottom tile overlaps top on mobile

const DESKTOP_TILE_W = 480; // px — SVG tile render width
const DESKTOP_SIDE_W = 280; // px — space each side for connectors + labels
const DESKTOP_STAGE_H = 340; // px — total stage height
const DESKTOP_BOTTOM_TOP = 120; // px — top offset of bottom tile within stage
// ─────────────────────────────────────────────────────────────────────────────

interface IsometricStageProps {
  colors: Colors;
}

export default function IsometricStage({ colors }: IsometricStageProps) {
  const [entered, setEntered] = useState<boolean>(false);
  const [floating, setFloating] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(
    () => window.innerWidth < MOBILE_BREAKPOINT,
  );
  const [desktopScale, setDesktopScale] = useState<number>(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const TILE_W = DESKTOP_TILE_W;
  const STAGE_W = DESKTOP_TILE_W + DESKTOP_SIDE_W * 2;
  const STAGE_H = DESKTOP_STAGE_H;

  useEffect(() => {
    const t1 = setTimeout(() => setEntered(true), 80);
    const t2 = setTimeout(() => setFloating(true), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (mobile) return;
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width;
      setDesktopScale(Math.min(1, available / STAGE_W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [mobile]);

  const SIDE_W = mobile ? 0 : DESKTOP_SIDE_W;

  const glowStyle: React.CSSProperties = {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "520px",
    height: "260px",
    background: `radial-gradient(ellipse, ${colors.glow} 0%, transparent 70%)`,
    borderRadius: "50%",
    pointerEvents: "none",
    transition: "background 0.5s",
  };

  const sharedTile: React.CSSProperties = mobile
    ? { position: "relative", width: "100%" }
    : { position: "absolute", width: `${TILE_W}px`, left: `${SIDE_W}px` };

  const bottomStyle: React.CSSProperties = mobile
    ? {
        ...sharedTile,
        marginTop: `-${MOBILE_OVERLAP}%`,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(24px)",
        transition:
          "opacity 1s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.3s",
        animation: floating
          ? "isoFloatDown 7s ease-in-out 0s infinite"
          : "none",
      }
    : {
        ...sharedTile,
        top: `${DESKTOP_BOTTOM_TOP}px`,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(24px)",
        transition:
          "opacity 1s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.3s",
        animation: floating
          ? "isoFloatDown 7s ease-in-out 0s infinite"
          : "none",
      };

  const topStyle: React.CSSProperties = mobile
    ? {
        ...sharedTile,
        zIndex: 1,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(-18px)",
        transition:
          "opacity 1.1s cubic-bezier(0.22,1,0.36,1) 0.85s, transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.85s",
        animation: floating
          ? "isoFloatUp 7s ease-in-out 0.2s infinite"
          : "none",
      }
    : {
        ...sharedTile,
        top: "0px",
        zIndex: 1,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(-18px)",
        transition:
          "opacity 1.1s cubic-bezier(0.22,1,0.36,1) 0.85s, transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.85s",
        animation: floating
          ? "isoFloatUp 7s ease-in-out 0.2s infinite"
          : "none",
      };

  return (
    <div
      ref={mobile ? undefined : wrapperRef}
      style={{
        width: "100%",
        maxWidth: mobile ? `${MOBILE_MAX_W}px` : `${STAGE_W}px`,
        margin: "0 auto",
      }}
    >
      {/* Inner div: fixed size on desktop, scaled down to fit; fluid on mobile */}
      <div
        style={{
          position: "relative",
          width: mobile ? "100%" : `${STAGE_W}px`,
          height: mobile ? "auto" : `${STAGE_H}px`,
          transformOrigin: "top left",
          transform:
            !mobile && desktopScale < 1
              ? `translateX(${(STAGE_W * (desktopScale - 1)) / 2}px) scale(${desktopScale})`
              : undefined,
          marginBottom:
            !mobile && desktopScale < 1
              ? `${STAGE_H * (desktopScale - 1)}px`
              : undefined,
        }}
      >
        <style>{`
          @keyframes isoFloatDown {
            0%, 100% { transform: translateY(0);   }
            50%       { transform: translateY(6px); }
          }
          @keyframes isoFloatUp {
            0%, 100% { transform: translateY(0);    }
            50%       { transform: translateY(-5px); }
          }
          @keyframes iconGlow {
            0%      { opacity: 0; }
            60%     { opacity: 0; }
            70%     { opacity: 1; }
            80%     { opacity: 1; }
            90%     { opacity: 0; }
            100%    { opacity: 0; }
          }
          @keyframes perimeterTrace {
            0%      { stroke-dashoffset: var(--pl); opacity: 1; }
            8.93%   { stroke-dashoffset: 0;         opacity: 1; }
            50%     { stroke-dashoffset: 0;         opacity: 1; }
            57.14%  { stroke-dashoffset: 0;         opacity: 0; }
            57.15%  { stroke-dashoffset: var(--pl); opacity: 0; }
            100%    { stroke-dashoffset: var(--pl); opacity: 0; }
          }
          @keyframes perimeterTraceBottom {
            0%      { stroke-dashoffset: var(--pl); opacity: 0; }
            8.93%   { stroke-dashoffset: var(--pl); opacity: 1; }
            17.86%  { stroke-dashoffset: 0;         opacity: 1; }
            50%     { stroke-dashoffset: 0;         opacity: 1; }
            57.14%  { stroke-dashoffset: 0;         opacity: 0; }
            57.15%  { stroke-dashoffset: var(--pl); opacity: 0; }
            100%    { stroke-dashoffset: var(--pl); opacity: 0; }
          }
          @keyframes perimeterGlow {
            0%      { opacity: 0; }
            21.43%  { opacity: 0; }
            28.57%  { opacity: 1; }
            35.71%  { opacity: 1; }
            42.86%  { opacity: 0; }
            100%    { opacity: 0; }
          }
        `}</style>

        {!mobile && <div style={glowStyle} />}
        {mobile ? (
          <>
            <div style={topStyle}>
              <TopElement colors={colors} tileWidth={TILE_W} mobile={mobile} />
            </div>
            <div style={bottomStyle}>
              <BottomElement
                colors={colors}
                tileWidth={TILE_W}
                mobile={mobile}
              />
            </div>
          </>
        ) : (
          <>
            <div style={bottomStyle}>
              <BottomElement
                colors={colors}
                tileWidth={TILE_W}
                mobile={mobile}
              />
            </div>
            <div style={topStyle}>
              <TopElement colors={colors} tileWidth={TILE_W} mobile={mobile} />
            </div>
          </>
        )}
      </div>

      {mobile && (
        <ul
          style={{
            listStyle: "none",
            margin: "24px 0 0",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {[...TOP_TILES, BOTTOM_TILE].map(({ id, label }) => (
            <li
              key={id}
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 700,
                fontSize: "22px",
                color: colors.label,
                letterSpacing: "0.01em",
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
